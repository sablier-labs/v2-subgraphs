import { Address, ByteArray, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { Campaign } from "../generated/types/schema";
import { CreateMerkleStreamerLL as EventCreateCampaignLL } from "../generated/types/templates/ContractMerkleStreamerFactory/SablierV2MerkleStreamerFactory";
import {
  ABI_CREATE_MERKLE_STREAMER_LL,
  getChainId,
  log_exit,
  one,
  zero,
} from "../constants";
import { getOrCreateAsset } from "./asset";
import { getFactoryById } from "./factory";
import { getOrCreateWatcher } from "./watcher";

export function getCampaignById(id: string): Campaign | null {
  return Campaign.load(id);
}

export function createCampaignLinear(
  event: EventCreateCampaignLL,
): Campaign | null {
  let id = generateCampaignId(event.params.merkleStreamer);
  let entity = getCampaignById(id);
  if (entity != null) {
    log_exit("Campaign already registered at this address");
    return null;
  }

  /** --------------- */
  let watcher = getOrCreateWatcher();

  /** --------------- */
  entity = new Campaign(id);

  entity.chainId = getChainId();
  entity.subgraphId = watcher.campaignIndex;
  entity.address = event.params.merkleStreamer;
  entity.hash = event.transaction.hash;
  entity.timestamp = event.block.timestamp;

  entity.admin = event.params.admin;
  entity.lockup = event.params.lockupLinear; // Replace when campaigns with LDs will be possible

  // TO DO entity.root
  entity.expires = !event.params.expiration.isZero();
  entity.expiration = event.params.expiration;

  entity.ipfsCID = event.params.ipfsCID;
  entity.expectedAmount = event.params.aggregateAmount;
  entity.expectedRecipients = event.params.recipientsCount;

  entity.category = "LockupLinear";
  entity.streamCliff = !event.params.streamDurations.cliff.isZero();
  entity.streamCliffDuration = event.params.streamDurations.cliff;
  entity.streamTotalDuration = event.params.streamDurations.total;
  entity.streamCancelable = event.params.cancelable;
  entity.streamTransferable = event.params.transferable;

  entity.clawbackAction = null;
  entity.clawbackTime = null;

  entity.claimedAmount = zero;
  entity.claimedCount = zero;

  /** --------------- */

  let inputs = _decodeInputs(event);
  if (inputs && inputs[3].kind === ethereum.ValueKind.FIXED_BYTES) {
    entity.root = inputs[3].toBytes();
  }

  /** --------------- */
  let factory = getFactoryById(event.address.toHexString());
  if (factory == null) {
    log_exit("Factory not yet registered at this address");
    return null;
  }
  entity.factory = factory.id;

  /** --------------- */
  let asset = getOrCreateAsset(event.params.asset);
  entity.asset = asset.id;

  /** --------------- */

  watcher.campaignIndex = watcher.campaignIndex.plus(one);
  watcher.save();

  /** --------------- */
  return entity;
}

export function generateCampaignId(address: Address): string {
  let id = ""
    .concat(address.toHexString())
    .concat("-")
    .concat(getChainId().toString());

  return id;
}

/**
 * https://medium.com/@r2d2_68242/indexing-transaction-input-data-in-a-subgraph-6ff5c55abf20
 * https://github.com/rust-ethereum/ethabi
 * https://ethereum.stackexchange.com/questions/114582/the-graph-nodes-cant-decode-abi-encoded-data-containing-arrays
 */

function _decodeInputs(event: EventCreateCampaignLL): ethereum.Tuple | null {
  let encoded = event.transaction.input;
  let sliced = encoded.subarray(4); // Remove the 0x prefix and the function signature bytes

  let prefix = ByteArray.fromHexString(
    "0x0000000000000000000000000000000000000000000000000000000000000020",
  );

  let input = new Uint8Array(prefix.length + sliced.length);
  input.set(prefix, 0);
  input.set(sliced, prefix.length);

  let decoded = ethereum.decode(
    ABI_CREATE_MERKLE_STREAMER_LL,
    Bytes.fromUint8Array(input),
  );

  if (decoded == null) {
    return null;
  }
  return decoded.toTuple();
}
