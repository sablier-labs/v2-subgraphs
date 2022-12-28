import {
  Cancel as EventCancel,
  Renounce as EventRenounce,
  Transfer as EventTransfer,
  Withdraw as EventWithdraw,
} from "../generated/types/templates/ContractLinear/SablierV2Linear";
import { CreateLinearStream as EventCreateLinearStream } from "../generated/types/templates/ContractLinear/SablierV2Linear";
import { CreateProStream as EventCreateProStream } from "../generated/types/templates/ContractPro/SablierV2Pro";
import { zero } from "../constants";
import { createAction, getStreamByIdFromSource } from "../helpers";
import { createLinearStream, createProStream } from "./stream";

export function handleCreateLinear(event: EventCreateLinearStream): void {
  let stream = createLinearStream(event);
  if (stream == null) {
    return;
  }

  let action = createAction(event);
  action.type = "Create";
  action.addressA = event.params.sender;
  action.addressB = event.params.recipient;
  action.amountA = event.params.depositAmount;

  if (stream.cancelable == false) {
    stream.cancelableAction = action.id;
  }
  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleCreatePro(event: EventCreateProStream): void {
  let stream = createProStream(event);
  if (stream == null) {
    return;
  }

  let action = createAction(event);
  action.type = "Create";
  action.addressA = event.params.sender;
  action.addressB = event.params.recipient;
  action.amountA = event.params.depositAmount;

  if (stream.cancelable == false) {
    stream.cancelableAction = action.id;
  }

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleCancel(event: EventCancel): void {
  let id = event.params.streamId;
  let stream = getStreamByIdFromSource(id);
  if (stream == null) {
    return;
  }

  let action = createAction(event);
  action.type = "Cancel";
  action.addressA = event.params.sender;
  action.addressB = event.params.recipient;
  action.amountA = event.params.returnAmount;
  action.amountB = event.params.withdrawAmount;
  /** --------------- */

  stream.canceled = true;
  stream.canceledAction = action.id;
  stream.withdrawnAmount = stream.withdrawnAmount.plus(
    event.params.withdrawAmount,
  );
  stream.intactAmount = zero;

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleRenounce(event: EventRenounce): void {
  let id = event.params.streamId;
  let stream = getStreamByIdFromSource(id);

  if (stream == null) {
    return;
  }

  let action = createAction(event);
  action.type = "Renounce";

  /** --------------- */

  stream.cancelable = false;
  stream.cancelableAction = action.id;
  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleTransfer(event: EventTransfer): void {
  let id = event.params.tokenId;
  let stream = getStreamByIdFromSource(id);
  if (stream == null) {
    return;
  }

  let action = createAction(event);
  action.type = "Transfer";

  action.addressA = event.params.from;
  action.addressB = event.params.to;

  /** --------------- */

  stream.recipient = event.params.to;
  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleWithdraw(event: EventWithdraw): void {
  let id = event.params.streamId;
  let stream = getStreamByIdFromSource(id);
  if (stream == null) {
    return;
  }

  let action = createAction(event);
  action.type = "Withdraw";
  action.addressB = event.params.recipient;
  action.amountB = event.params.amount;

  /** --------------- */

  let withdrawn = stream.withdrawnAmount.plus(event.params.amount);
  stream.withdrawnAmount = withdrawn;
  stream.intactAmount = stream.depositAmount.minus(withdrawn);
  stream.save();
  action.stream = stream.id;
  action.save();
}
