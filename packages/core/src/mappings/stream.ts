import { BigInt, dataSource, ethereum, log } from "@graphprotocol/graph-ts";
import { Stream } from "../generated/types/schema";
import { CreateLinearStream as EventCreateLinearStream } from "../generated/types/templates/ContractLinear/SablierV2Linear";
import { CreateProStream as EventCreateProStream } from "../generated/types/templates/ContractPro/SablierV2Pro";
import { one, zero } from "../constants";
import {
  generateStreamId,
  getContractById,
  getOrCreateGroup,
  getOrCreateToken,
  getOrCreateWatcher,
} from "../helpers";

function createStream(streamId: BigInt, event: ethereum.Event): Stream | null {
  let watcher = getOrCreateWatcher();
  let contract = getContractById(dataSource.address().toHexString());
  if (contract == null) {
    log.critical(
      "Contract hasn't been registered before this create event: {}",
      [dataSource.address().toHexString()],
    );
    return null;
  }

  /** --------------- */
  let id = generateStreamId(streamId);
  if (id == null) {
    return null;
  }

  /** --------------- */
  let entity = new Stream(id);
  /** --------------- */
  entity.streamId = streamId;
  entity.contract = contract.id;
  entity.globalId = watcher.streamIndex;
  entity.hash = event.transaction.hash;
  entity.timestamp = event.block.timestamp;

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

export function createLinearStream(
  event: EventCreateLinearStream,
): Stream | null {
  let streamId = event.params.streamId;
  let entity = createStream(streamId, event);

  if (entity == null) {
    return null;
  }

  /** --------------- */
  entity.funder = event.params.funder;
  entity.sender = event.params.sender;
  entity.recipient = event.params.recipient;
  entity.depositAmount = event.params.depositAmount;
  entity.startTime = event.params.startTime;
  entity.endTime = event.params.stopTime;
  entity.cancelable = event.params.cancelable;

  /** --------------- */
  entity.cliffTime = event.params.cliffTime;
  let duration = event.params.stopTime.minus(event.params.startTime);
  let cliff = event.params.cliffTime.minus(event.params.startTime);
  if (!cliff.isZero()) {
    entity.cliffAmount = entity.depositAmount.times(duration.div(cliff));
  }

  /** --------------- */
  let token = getOrCreateToken(event.params.token);
  entity.token = token.id;

  /** --------------- */
  let group = getOrCreateGroup(event, event.params.sender);
  entity.group = group.id;

  entity.save();
  return entity;
}

export function createProStream(event: EventCreateProStream): Stream | null {
  let streamId = event.params.streamId;
  let entity = createStream(streamId, event);

  if (entity == null) {
    return null;
  }

  /** --------------- */
  entity.funder = event.params.funder;
  entity.sender = event.params.sender;
  entity.recipient = event.params.recipient;
  entity.depositAmount = event.params.depositAmount;
  entity.startTime = event.params.startTime;
  entity.endTime = event.params.stopTime;
  entity.cancelable = event.params.cancelable;

  /** --------------- */
  let token = getOrCreateToken(event.params.token);
  entity.token = token.id;

  /** --------------- */
  let group = getOrCreateGroup(event, event.params.sender);
  entity.group = group.id;

  entity.save();
  return entity;
}
