import {
  Cancel as EventCancel,
  Renounce as EventRenounce,
  Transfer as EventTransfer,
  Withdraw as EventWithdraw,
} from "../generated/types/templates/ContractLinear/SablierV2Linear";
import { CreateLinearStream as EventCreateLinearStream } from "../generated/types/templates/ContractLinear/SablierV2Linear";
import { CreateProStream as EventCreateProStream } from "../generated/types/templates/ContractPro/SablierV2Pro";
import { createAction, getStreamById } from "../helpers";
import { createLinearStream, createProStream } from "./stream";

export function handleCreateLinear(event: EventCreateLinearStream): void {
  let stream = createLinearStream(event);
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
  let id = event.params.streamId.toHexString();
  let stream = getStreamById(id);

  if (stream == null) {
    return;
  }
}

export function handleRenounce(event: EventRenounce): void {
  let id = event.params.streamId.toHexString();
  let stream = getStreamById(id);

  if (stream == null) {
    return;
  }
}
export function handleTransfer(event: EventTransfer): void {
  let id = event.params.tokenId.toHexString();
  let stream = getStreamById(id);

  if (stream == null) {
    return;
  }
}
export function handleWithdraw(event: EventWithdraw): void {
  let id = event.params.streamId.toHexString();
  let stream = getStreamById(id);

  if (stream == null) {
    return;
  }
}
