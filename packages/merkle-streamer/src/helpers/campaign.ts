import { Address, log } from "@graphprotocol/graph-ts";
import { Campaign } from "../generated/types/schema";
import { CreateMerkleStreamerLL as EventCreateCampaignLL } from "../generated/types/templates/ContractMerkleStreamerFactory/SablierV2MerkleStreamerFactory";
import { getChainId, one, zero } from "../constants";
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
    log.critical("[SABLIER] Campaign already registered at this address", []);
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

  entity.streamCategory = "LockupLinear";
  entity.streamCliff = !event.params.streamDurations.cliff.isZero();
  entity.streamCliffDuration = event.params.streamDurations.cliff;
  entity.streamTotalDuration = event.params.streamDurations.total;
  entity.streamCancelable = event.params.cancelable;

  entity.clawbackAction = null;
  entity.clawbackTime = null;

  entity.claimedAmount = zero;
  entity.claimedCount = zero;

  /** --------------- */
  let factory = getFactoryById(event.address.toHexString());
  if (factory == null) {
    log.critical("[SABLIER] Factory not yet registered at this address", []);
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

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateCampaignId(address: Address): string {
  let id = ""
    .concat(address.toHexString())
    .concat("-")
    .concat(getChainId().toString());

  return id;
}
