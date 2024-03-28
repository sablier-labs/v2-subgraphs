import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { Campaign } from "../generated/types/schema";
import {
  CreateMerkleStreamerLL as EventCreateCampaignLL_V21,
  CreateMerkleLockupLL as EventCreateCampaignLL_V22,
  CreateMerkleLockupLT as EventCreateCampaignLT_V22,
} from "../generated/types/templates/ContractMerkleLockupFactory/SablierV2MerkleLockupFactory";

import {
  StreamVersion_V21,
  StreamVersion_V22,
  getChainId,
  log_exit,
  one,
  zero,
} from "../constants";
import { getOrCreateAsset } from "./asset";
import { getFactoryByAddress } from "./factory";
import { getOrCreateWatcher } from "./watcher";
import { createTranches } from "./tranches";

export function getCampaignById(id: string): Campaign | null {
  return Campaign.load(id);
}

function createCampaignLinear(
  id: string,
  event: ethereum.Event,
): Campaign | null {
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
  entity.hash = event.transaction.hash;
  entity.timestamp = event.block.timestamp;

  entity.clawbackAction = null;
  entity.clawbackTime = null;

  entity.claimedAmount = zero;
  entity.claimedCount = zero;

  entity.streamCliff = false;
  entity.streamCliffDuration = zero;
  entity.streamTotalDuration = zero;

  /** --------------- */
  let factory = getFactoryByAddress(event.address);
  if (factory == null) {
    log_exit("Factory not yet registered at this address");
    return null;
  }
  entity.factory = factory.id;

  /** --------------- */

  watcher.campaignIndex = watcher.campaignIndex.plus(one);
  watcher.save();

  return entity;
}

export function createCampaignLinear_V21(
  event: EventCreateCampaignLL_V21,
): Campaign | null {
  let id = generateCampaignId(event.params.merkleStreamer);
  let entity = createCampaignLinear(id, event);

  if (entity == null) {
    log_exit("Campaign is missing.");
    return null;
  }

  entity.address = event.params.merkleStreamer;
  entity.category = "LockupLinear";

  entity.admin = event.params.admin;
  entity.lockup = event.params.lockupLinear;

  entity.expires = !event.params.expiration.isZero();
  entity.expiration = event.params.expiration;

  entity.root = event.params.merkleRoot;
  entity.ipfsCID = event.params.ipfsCID;
  entity.aggregateAmount = event.params.aggregateAmount;
  entity.totalRecipients = event.params.recipientsCount;

  entity.streamCliff = !event.params.streamDurations.cliff.isZero();
  entity.streamCliffDuration = event.params.streamDurations.cliff;
  entity.streamTotalDuration = event.params.streamDurations.total;
  entity.streamCancelable = event.params.cancelable;
  entity.streamTransferable = event.params.transferable;

  entity.version = StreamVersion_V21;

  /** --------------- */
  let asset = getOrCreateAsset(event.params.asset);
  entity.asset = asset.id;

  /** --------------- */
  return entity;
}

export function createCampaignLinear_V22(
  event: EventCreateCampaignLL_V22,
): Campaign | null {
  let id = generateCampaignId(event.params.merkleLockupLL);
  let entity = createCampaignLinear(id, event);

  if (entity == null) {
    log_exit("Campaign is missing.");
    return null;
  }

  entity.address = event.params.merkleLockupLL;
  entity.category = "LockupLinear";

  entity.lockup = event.params.lockupLinear;
  entity.aggregateAmount = event.params.aggregateAmount;
  entity.totalRecipients = event.params.recipientsCount;

  entity.streamCliff = !event.params.streamDurations.cliff.isZero();
  entity.streamCliffDuration = event.params.streamDurations.cliff;
  entity.streamTotalDuration = event.params.streamDurations.total;

  let baseParams = baseParamsLL_V22(event);

  entity.admin = baseParams.initialAdmin;
  entity.expires = !baseParams.expiration.isZero();
  entity.expiration = baseParams.expiration;
  entity.root = baseParams.merkleRoot;
  entity.ipfsCID = baseParams.ipfsCID;
  entity.streamCancelable = baseParams.cancelable;
  entity.streamTransferable = baseParams.transferable;

  entity.version = StreamVersion_V22;

  /** --------------- */
  let asset = getOrCreateAsset(baseParams.asset);
  entity.asset = asset.id;

  /** --------------- */
  return entity;
}

export function createCampaignTranched_V22(
  event: EventCreateCampaignLT_V22,
): Campaign | null {
  let id = generateCampaignId(event.params.merkleLockupLT);
  let entity = createCampaignLinear(id, event);

  if (entity == null) {
    log_exit("Campaign is missing.");
    return null;
  }

  entity.address = event.params.merkleLockupLT;
  entity.category = "LockupLinear";

  entity.lockup = event.params.lockupTranched;
  entity.aggregateAmount = event.params.aggregateAmount;
  entity.totalRecipients = event.params.recipientsCount;

  let baseParams = baseParamsLT_V22(event);

  entity.admin = baseParams.initialAdmin;
  entity.expires = !baseParams.expiration.isZero();
  entity.expiration = baseParams.expiration;
  entity.root = baseParams.merkleRoot;
  entity.ipfsCID = baseParams.ipfsCID;
  entity.streamCancelable = baseParams.cancelable;
  entity.streamTransferable = baseParams.transferable;

  entity.version = StreamVersion_V22;

  /** --------------- */
  let asset = getOrCreateAsset(baseParams.asset);
  entity.asset = asset.id;

  /** --------------- */
  entity = createTranches(entity, event);

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
 *
 * Type helper for the Base Params / Constructor Params tuple
 *
 */

function baseParamsLL_V22(
  event: EventCreateCampaignLL_V22,
): CreateMerkleLockupBaseParamsStruct {
  return changetype<CreateMerkleLockupBaseParamsStruct>(
    event.parameters[1].value.toTuple(),
  );
}

function baseParamsLT_V22(
  event: EventCreateCampaignLT_V22,
): CreateMerkleLockupBaseParamsStruct {
  return changetype<CreateMerkleLockupBaseParamsStruct>(
    event.parameters[1].value.toTuple(),
  );
}

class CreateMerkleLockupBaseParamsStruct extends ethereum.Tuple {
  get initialAdmin(): Address {
    return this[0].toAddress();
  }

  get asset(): Address {
    return this[1].toAddress();
  }

  get ipfsCID(): string {
    return this[2].toString();
  }

  get name(): string {
    return this[3].toString();
  }

  get merkleRoot(): Bytes {
    return this[4].toBytes();
  }

  get expiration(): BigInt {
    return this[5].toBigInt();
  }

  get cancelable(): boolean {
    return this[6].toBoolean();
  }

  get transferable(): boolean {
    return this[7].toBoolean();
  }
}
