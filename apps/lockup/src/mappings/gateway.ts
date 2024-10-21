import { ethereum } from "@graphprotocol/graph-ts";
import {
  CreateLockupDynamicStream as EventCreateDynamic_V20,
  CreateLockupDynamicStream1 as EventCreateDynamic_V21,
  CreateLockupDynamicStream2 as EventCreateDynamic_V22,
} from "../generated/types/templates/ContractLockupDynamic/SablierLockupDynamic";
import {
  CancelLockupStream as EventCancel_V20,
  CancelLockupStream1 as EventCancel_V21_V22,
  CreateLockupLinearStream as EventCreateLinear_V20,
  CreateLockupLinearStream1 as EventCreateLinear_V21,
  CreateLockupLinearStream2 as EventCreateLinear_V22,
  WithdrawFromLockupStream as EventWithdraw_V20,
  WithdrawFromLockupStream1 as EventWithdraw_V21_V22,
} from "../generated/types/templates/ContractLockupLinear/SablierLockupLinear";
import { CreateLockupTranchedStream as EventCreateTranched_V22 } from "../generated/types/templates/ContractLockupTranched/SablierLockupTranched";
import { zero } from "../constants";
import {
  handleApproval,
  handleApprovalForAll,
  handleCancel,
  handleCreateDynamic,
  handleCreateLinear,
  handleCreateTranched,
  handleRenounce,
  handleTransfer,
  handleTransferAdmin,
  handleWithdraw,
} from "./handle-stream";

function handleCancel_V20(event: EventCancel_V20): void {
  handleCancel(event);
}

function handleCancel_V21_V22(event_: EventCancel_V21_V22): void {
  let parameters = event_.parameters.filter((_value, index) => index !== 3);

  let event = new EventCancel_V20(
    event_.address,
    event_.logIndex,
    event_.transactionLogIndex,
    event_.logType,
    event_.block,
    event_.transaction,
    parameters,
    event_.receipt,
  );

  handleCancel(event);
}

function handleWithdraw_V20(event: EventWithdraw_V20): void {
  handleWithdraw(event);
}

function handleWithdraw_V21_V22(event_: EventWithdraw_V21_V22): void {
  let parameters = event_.parameters.filter((_value, index) => index !== 2);

  let event = new EventWithdraw_V20(
    event_.address,
    event_.logIndex,
    event_.transactionLogIndex,
    event_.logType,
    event_.block,
    event_.transaction,
    parameters,
    event_.receipt,
  );

  handleWithdraw(event);
}

function handleCreateLinear_V20(event: EventCreateLinear_V20): void {
  handleCreateLinear(event);
}

function handleCreateLinear_V21(event_: EventCreateLinear_V21): void {
  let parameters_no_transferrable = event_.parameters.filter(
    (_value, index) => index !== 7,
  );

  let event = new EventCreateLinear_V20(
    event_.address,
    event_.logIndex,
    event_.transactionLogIndex,
    event_.logType,
    event_.block,
    event_.transaction,
    parameters_no_transferrable,
    event_.receipt,
  );

  let stream = handleCreateLinear(event);
  if (stream == null) {
    return;
  }

  stream.transferable = event_.params.transferable;
  stream.save();
}

function handleCreateLinear_V22(event_: EventCreateLinear_V22): void {
  let parameters_no_fee = event_.parameters;
  let amounts = parameters_no_fee[4].value.toTuple();
  amounts.push(ethereum.Value.fromUnsignedBigInt(zero));
  let parameter = new ethereum.EventParam(
    parameters_no_fee[4].name,
    ethereum.Value.fromTuple(amounts),
  );
  parameters_no_fee[4] = parameter;

  let parameters_no_transferrable = parameters_no_fee.filter(
    (_value, index) => index !== 7,
  );

  /** event.params.timestamps -> [8] -> event.params.range */

  let event = new EventCreateLinear_V20(
    event_.address,
    event_.logIndex,
    event_.transactionLogIndex,
    event_.logType,
    event_.block,
    event_.transaction,
    parameters_no_transferrable,
    event_.receipt,
  );

  let stream = handleCreateLinear(event);
  if (stream == null) {
    return;
  }

  stream.transferable = event_.params.transferable;
  stream.save();
}

function handleCreateDynamic_V20(event: EventCreateDynamic_V20): void {
  handleCreateDynamic(event);
}

function handleCreateDynamic_V21(event_: EventCreateDynamic_V21): void {
  let parameters_no_transferrable = event_.parameters.filter(
    (_value, index) => index !== 7,
  );

  let event = new EventCreateDynamic_V20(
    event_.address,
    event_.logIndex,
    event_.transactionLogIndex,
    event_.logType,
    event_.block,
    event_.transaction,
    parameters_no_transferrable,
    event_.receipt,
  );

  let stream = handleCreateDynamic(event);
  if (stream == null) {
    return;
  }

  stream.transferable = event_.params.transferable;
  stream.save();
}

function handleCreateDynamic_V22(event_: EventCreateDynamic_V22): void {
  let parameters_no_fee = event_.parameters;
  let amounts = parameters_no_fee[4].value.toTuple();
  amounts.push(ethereum.Value.fromUnsignedBigInt(zero));
  let parameter = new ethereum.EventParam(
    parameters_no_fee[4].name,
    ethereum.Value.fromTuple(amounts),
  );
  parameters_no_fee[4] = parameter;

  let parameters_no_transferrable = parameters_no_fee.filter(
    (_value, index) => index !== 7,
  );

  /** event.params.timestamps -> [8] -> event.params.range */

  let event = new EventCreateDynamic_V20(
    event_.address,
    event_.logIndex,
    event_.transactionLogIndex,
    event_.logType,
    event_.block,
    event_.transaction,
    parameters_no_transferrable,
    event_.receipt,
  );

  let stream = handleCreateDynamic(event);
  if (stream == null) {
    return;
  }

  stream.transferable = event_.params.transferable;
  stream.save();
}

function handleCreateTranched_V22(event: EventCreateTranched_V22): void {
  let stream = handleCreateTranched(event);
  if (stream == null) {
    return;
  }

  stream.transferable = event.params.transferable;
  stream.save();
}

export {
  handleApproval,
  handleApprovalForAll,
  handleCancel_V20,
  handleCancel_V21_V22,
  handleCreateLinear_V20,
  handleCreateLinear_V21,
  handleCreateLinear_V22,
  handleCreateDynamic_V20,
  handleCreateDynamic_V21,
  handleCreateDynamic_V22,
  handleCreateTranched_V22,
  handleRenounce,
  handleTransfer,
  handleTransferAdmin,
  handleWithdraw_V20,
  handleWithdraw_V21_V22,
};
