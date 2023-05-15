import { BigInt, dataSource, ethereum, log } from "@graphprotocol/graph-ts";
import { Stream } from "../generated/types/schema";
import { CreateLockupDynamicStream as EventCreateDynamic } from "../generated/types/templates/ContractLockupDynamic/SablierV2LockupDynamic";
import { CreateLockupLinearStream as EventCreateLinear } from "../generated/types/templates/ContractLockupLinear/SablierV2LockupLinear";
import { getChainId, one, zero } from "../constants";
import { getOrCreateAsset } from "./asset";
import { getOrCreateBatch } from "./batch";
import { getContractById } from "./contract";
import { createSegments } from "./segments";
import { getOrCreateWatcher } from "./watcher";

function createStream(tokenId: BigInt, event: ethereum.Event): Stream | null {
  let watcher = getOrCreateWatcher();
  let contract = getContractById(dataSource.address().toHexString());
  if (contract == null) {
    log.critical(
      "[SABLIER] Contract hasn't been registered before this create event: {}",
      [dataSource.address().toHexString()],
    );
    return null;
  }

  /** --------------- */
  let id = generateStreamId(tokenId);
  if (id == null) {
    return null;
  }

  let alias = generateStreamAlias(tokenId);

  /** --------------- */
  let entity = new Stream(id);
  /** --------------- */
  entity.tokenId = tokenId;
  entity.alias = alias;
  entity.contract = contract.id;
  entity.subgraphId = watcher.streamIndex;
  entity.hash = event.transaction.hash;
  entity.timestamp = event.block.timestamp;
  entity.chainId = getChainId();

  /** --------------- */
  entity.canceled = false;
  entity.cancelableAction = null;
  entity.canceledAction = null;
  entity.cliffAmount = null;
  entity.cliffTime = null;
  entity.withdrawnAmount = zero;

  /** --------------- */
  watcher.streamIndex = watcher.streamIndex.plus(one);
  watcher.save();

  return entity;
}

export function createLinearStream(event: EventCreateLinear): Stream | null {
  let tokenId = event.params.streamId;
  let entity = createStream(tokenId, event);

  if (entity == null) {
    return null;
  }

  /** --------------- */
  entity.category = "Linear";
  entity.funder = event.params.funder;
  entity.sender = event.params.sender;
  entity.recipient = event.params.recipient;
  entity.parties = [event.params.sender, event.params.recipient];

  entity.depositAmount = event.params.amounts.deposit;
  entity.brokerFeeAmount = event.params.amounts.brokerFee;
  entity.protocolFeeAmount = event.params.amounts.protocolFee;
  entity.intactAmount = event.params.amounts.deposit;

  entity.startTime = event.params.range.start;
  entity.endTime = event.params.range.end;
  entity.cancelable = event.params.cancelable;

  /** --------------- */

  let duration = event.params.range.end.minus(event.params.range.start);
  let cliff = event.params.range.cliff.minus(event.params.range.start);
  if (!cliff.isZero()) {
    entity.cliff = true;
    entity.cliffAmount = entity.depositAmount.times(cliff.div(duration));
    entity.cliffTime = event.params.range.cliff;
  } else {
    entity.cliff = false;
  }

  /** --------------- */
  let asset = getOrCreateAsset(event.params.asset);
  entity.asset = asset.id;

  /** --------------- */
  let batch = getOrCreateBatch(event, event.params.sender);
  entity.batch = batch.id;
  entity.position = batch.size.minus(one);

  entity.save();
  return entity;
}

export function createDynamicStream(event: EventCreateDynamic): Stream | null {
  let tokenId = event.params.streamId;
  let entity = createStream(tokenId, event);

  if (entity == null) {
    return null;
  }

  /** --------------- */
  entity.category = "Dynamic";
  entity.funder = event.params.funder;
  entity.sender = event.params.sender;
  entity.recipient = event.params.recipient;
  entity.parties = [event.params.sender, event.params.recipient];

  entity.depositAmount = event.params.amounts.deposit;
  entity.brokerFeeAmount = event.params.amounts.brokerFee;
  entity.protocolFeeAmount = event.params.amounts.protocolFee;
  entity.intactAmount = event.params.amounts.deposit;

  entity.startTime = event.params.range.start;
  entity.endTime = event.params.range.end;
  entity.cancelable = event.params.cancelable;

  /** --------------- */
  let asset = getOrCreateAsset(event.params.asset);
  entity.asset = asset.id;

  /** --------------- */
  let batch = getOrCreateBatch(event, event.params.sender);
  entity.batch = batch.id;
  entity.position = batch.size.minus(one);

  /** --------------- */
  entity.save();

  /** --------------- */
  entity = createSegments(entity, event);

  /** --------------- */
  return entity;
}

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateStreamId(tokenId: BigInt): string {
  let contract = getContractById(dataSource.address().toHexString());
  if (contract == null) {
    log.critical(
      "[SABLIER] Contract hasn't been registered before this create event: {}",
      [dataSource.address().toHexString()],
    );
    return "";
  }

  let id = contract.address
    .toHexString()
    .concat("-")
    .concat(getChainId().toString())
    .concat("-")
    .concat(tokenId.toString());

  return id;
}

export function generateStreamAlias(tokenId: BigInt): string {
  let contract = getContractById(dataSource.address().toHexString());
  if (contract == null) {
    log.critical(
      "[SABLIER] Contract hasn't been registered before this create event: {}",
      [dataSource.address().toHexString()],
    );
    return "";
  }

  let id = contract.alias
    .concat("-")
    .concat(getChainId().toString())
    .concat("-")
    .concat(tokenId.toString());

  return id;
}

export function getStreamByIdFromSource(tokenId: BigInt): Stream | null {
  let id = generateStreamId(tokenId);
  return Stream.load(id);
}
