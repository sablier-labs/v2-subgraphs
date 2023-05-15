import { dataSource, log } from "@graphprotocol/graph-ts";
import {
  Approval as EventApproval,
  ApprovalForAll as EventApprovalForAll,
  CancelLockupStream as EventCancel,
  RenounceLockupStream as EventRenounce,
  SetComptroller as EventSetComptroller,
  Transfer as EventTransfer,
  WithdrawFromLockupStream as EventWithdraw,
} from "../generated/types/templates/ContractLockupLinear/SablierV2LockupLinear";
import { CreateLockupLinearStream as EventCreateLinear } from "../generated/types/templates/ContractLockupLinear/SablierV2LockupLinear";
import { CreateLockupProStream as EventCreatePro } from "../generated/types/templates/ContractLockupPro/SablierV2LockupPro";
import { one, zero } from "../constants";
import {
  createAction,
  getContractById,
  getOrCreateComptroller,
  getStreamByIdFromSource,
} from "../helpers";
import { createLinearStream, createProStream } from "../helpers/stream";

export function handleCreateLinear(event: EventCreateLinear): void {
  let stream = createLinearStream(event);
  if (stream == null) {
    return;
  }

  let action = createAction(event);
  action.category = "Create";
  action.addressA = event.params.sender;
  action.addressB = event.params.recipient;
  action.amountA = event.params.amounts.deposit;

  if (stream.cancelable == false) {
    stream.cancelableAction = action.id;
    stream.cancelableTime = event.block.timestamp;
  }
  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleCreatePro(event: EventCreatePro): void {
  let stream = createProStream(event);
  if (stream == null) {
    return;
  }

  let action = createAction(event);
  action.category = "Create";
  action.addressA = event.params.sender;
  action.addressB = event.params.recipient;
  action.amountA = event.params.amounts.deposit;

  if (stream.cancelable == false) {
    stream.cancelableAction = action.id;
    stream.cancelableTime = event.block.timestamp;
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
  action.category = "Cancel";
  action.addressA = event.params.sender;
  action.addressB = event.params.recipient;
  action.amountA = event.params.senderAmount;
  action.amountB = event.params.recipientAmount;
  /** --------------- */

  stream.canceled = true;
  stream.canceledAction = action.id;
  stream.canceledTime = event.block.timestamp;
  stream.withdrawnAmount = stream.withdrawnAmount.plus(
    event.params.recipientAmount,
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
  action.category = "Renounce";

  /** --------------- */

  stream.cancelable = false;
  stream.cancelableAction = action.id;
  stream.cancelableTime = event.block.timestamp;

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
  action.category = "Transfer";

  action.addressA = event.params.from;
  action.addressB = event.params.to;

  /** --------------- */

  stream.recipient = event.params.to;
  stream.parties = [stream.sender, event.params.to];
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
  action.category = "Withdraw";
  action.addressA = event.transaction.from;
  action.addressB = event.params.to;
  action.amountB = event.params.amount;

  /** --------------- */

  let withdrawn = stream.withdrawnAmount.plus(event.params.amount);
  stream.withdrawnAmount = withdrawn;
  stream.intactAmount = stream.depositAmount.minus(withdrawn);
  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleApproval(event: EventApproval): void {
  let id = event.params.tokenId;
  let stream = getStreamByIdFromSource(id);
  if (stream == null) {
    return;
  }

  let action = createAction(event);
  action.category = "Approval";

  action.addressA = event.params.owner;
  action.addressB = event.params.approved;

  /** --------------- */

  action.stream = stream.id;
  action.save();
}
export function handleApprovalForAll(event: EventApprovalForAll): void {
  let action = createAction(event);
  action.category = "ApprovalForAll";

  action.addressA = event.params.owner;
  action.addressB = event.params.operator;
  action.amountA = event.params.approved ? one : zero;

  /** --------------- */

  action.save();
}

export function handleComptrollerSet(event: EventSetComptroller): void {
  let contract = getContractById(dataSource.address().toHexString());
  if (contract == null) {
    log.critical(
      "[SABLIER] Contract hasn't been registered before this create event: {}",
      [dataSource.address().toHexString()],
    );
    return;
  }

  let comptroller = getOrCreateComptroller(event.params.newComptroller);

  comptroller.save();
  contract.comptroller = comptroller.id;

  contract.save();
}
