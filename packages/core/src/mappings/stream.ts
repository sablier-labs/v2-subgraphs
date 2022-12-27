import { dataSource, ethereum, log } from "@graphprotocol/graph-ts";
import { Stream } from "../generated/types/schema";
import { CreateLinearStream as EventCreateLinearStream } from "../generated/types/templates/ContractLinear/SablierV2Linear";
import { CreateProStream as EventCreateProStream } from "../generated/types/templates/ContractPro/SablierV2Pro";
import { zero } from "../constants";
import {
  getContractById,
  getOrCreateGroup,
  getOrCreateToken,
} from "../helpers";

function createStream(id: string, event: ethereum.Event): Stream {
  let entity = new Stream(id);
  /** --------------- */
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
  let contract = getContractById(dataSource.address().toHexString());
  if (contract == null) {
    log.critical(
      "Contract hasn't been registered before this create event: {}",
      [dataSource.address().toHexString()],
    );
  } else {
    entity.contract = contract.id;
  }

  return entity;
}

export function createLinearStream(event: EventCreateLinearStream): Stream {
  let id = event.params.streamId.toHexString();
  let entity = createStream(id, event);

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

export function createProStream(event: EventCreateProStream): Stream {
  let id = event.params.streamId.toHexString();
  let entity = createStream(id, event);

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
