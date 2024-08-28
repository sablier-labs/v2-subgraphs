import type {
  /** Event: Approval (NFT) */
  LockupV20_Approval_eventArgs as EventApprovalArgs_V20_V21_V22,
  /** Event: ApprovalForAll (NFT) */
  LockupV20_ApprovalForAll_eventArgs as EventApprovalForAllArgs_V20_V21_V22,
  /** Event: Cancel (Lockup) */
  LockupV20_CancelLockupStream_eventArgs as EventCancelArgs_V20,
  LockupV21_CancelLockupStream_eventArgs as EventCancelArgs_V21_V22,
  /** Event: Create Dynamic (Lockup) */
  LockupV20_CreateLockupDynamicStream_eventArgs as EventCreateDynamicArgs_V20,
  LockupV21_CreateLockupDynamicStream_eventArgs as EventCreateDynamicArgs_V21,
  LockupV22_CreateLockupDynamicStream_eventArgs as EventCreateDynamicArgs_V22,
  /** Event: Create Linear (Lockup) */
  LockupV20_CreateLockupLinearStream_eventArgs as EventCreateLinearArgs_V20,
  LockupV21_CreateLockupLinearStream_eventArgs as EventCreateLinearArgs_V21,
  LockupV22_CreateLockupLinearStream_eventArgs as EventCreateLinearArgs_V22,
  /** Event: Create Tranched (Lockup) */
  LockupV22_CreateLockupTranchedStream_eventArgs as EventCreateTranchedArgs_V22,
  /** Event: Renounce (Lockup) */
  LockupV20_RenounceLockupStream_eventArgs as EventRenounceArgs_V20_V21_V22,
  /** Event: Transfer (NFT) */
  LockupV20_Transfer_eventArgs as EventTransferArgs_V20_V21_V22,
  /** Event: TransferAdmin (Lockup) */
  LockupV20_TransferAdmin_eventArgs as EventTransferAdminArgs_V20_V21_V22,
  /** Event: Withdraw (Lockup) */
  LockupV20_WithdrawFromLockupStream_eventArgs as EventWithdrawArgs_V20,
  LockupV21_WithdrawFromLockupStream_eventArgs as EventWithdrawArgs_V21_V22,
} from "../../generated/src/Types.gen";

import type {
  /** Event: Approval (NFT) */
  LockupV20_Approval_handlerWithLoader as HandlerLoaderApproval_V20_V21_V22,
  /** Event: ApprovalForAll (NFT) */
  LockupV20_ApprovalForAll_handlerWithLoader as HandlerLoaderApprovalForAll_V20_V21_V22,
  /** Event: Cancel (Lockup) */
  LockupV20_CancelLockupStream_handlerWithLoader as HandlerLoaderCancel_V20,
  LockupV21_CancelLockupStream_handlerWithLoader as HandlerLoaderCancel_V21_V22,

  /** Event: Create Dynamic (Lockup) */
  LockupV20_CreateLockupDynamicStream_handlerWithLoader as HandlerLoaderCreateDynamic_V20,
  LockupV21_CreateLockupDynamicStream_handlerWithLoader as HandlerLoaderCreateDynamic_V21,
  LockupV22_CreateLockupDynamicStream_handlerWithLoader as HandlerLoaderCreateDynamic_V22,
  /** Event: Create Linear (Lockup) */
  LockupV20_CreateLockupLinearStream_handlerWithLoader as HandlerLoaderCreateLinear_V20,
  LockupV21_CreateLockupLinearStream_handlerWithLoader as HandlerLoaderCreateLinear_V21,
  LockupV22_CreateLockupLinearStream_handlerWithLoader as HandlerLoaderCreateLinear_V22,
  /** Event: Create Tranched (Lockup) */
  LockupV22_CreateLockupTranchedStream_handlerWithLoader as HandlerLoaderCreateTranched_V22,
  /** Event: Renounce (Lockup) */
  LockupV20_RenounceLockupStream_handlerWithLoader as HandlerLoaderRenounce_V20_V21_V22,
  /** Event: Transfer (NFT) */
  LockupV20_Transfer_handlerWithLoader as HandlerLoaderTransfer_V20_V21_V22,
  /** Event: TransferAdmin (Lockup) */
  LockupV20_TransferAdmin_handlerWithLoader as HandlerLoaderTransferAdmin_V20_V21_V22,
  /** Event: Withdraw (Lockup) */
  LockupV20_WithdrawFromLockupStream_handlerWithLoader as HandlerLoaderWithdraw_V20,
  LockupV21_WithdrawFromLockupStream_handlerWithLoader as HandlerLoaderWithdraw_V21_V22,
} from "../../generated/src/Handlers.gen";

import type { Loader, Handler } from "./utils";

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type ApprovalLoader = Loader<typeof HandlerLoaderApproval_V20_V21_V22>;
export type ApprovalHandler<Loaded> = Handler<
  Loaded,
  typeof HandlerLoaderApproval_V20_V21_V22
>;

/** ------------------------------------------------------------- */

export type ApprovalForAllLoader = Loader<
  typeof HandlerLoaderApprovalForAll_V20_V21_V22
>;
export type ApprovalForAllHandler<Loaded> = Handler<
  Loaded,
  typeof HandlerLoaderApprovalForAll_V20_V21_V22
>;

/** ------------------------------------------------------------- */

export type CancelLoader = Loader<
  typeof HandlerLoaderCancel_V20 | typeof HandlerLoaderCancel_V21_V22
>;
export type CancelHandler<Loaded> = Handler<
  Loaded,
  typeof HandlerLoaderCancel_V20 | typeof HandlerLoaderCancel_V21_V22
>;

/** ------------------------------------------------------------- */

export type CreateLinearLoader = Loader<
  | typeof HandlerLoaderCreateLinear_V20
  | typeof HandlerLoaderCreateLinear_V21
  | typeof HandlerLoaderCreateLinear_V22
>;
export type CreateLinearHandler<Loaded> = Handler<
  Loaded,
  | typeof HandlerLoaderCreateLinear_V20
  | typeof HandlerLoaderCreateLinear_V21
  | typeof HandlerLoaderCreateLinear_V22
>;

/** ------------------------------------------------------------- */

export type CreateDynamicLoader = Loader<
  | typeof HandlerLoaderCreateDynamic_V20
  | typeof HandlerLoaderCreateDynamic_V21
  | typeof HandlerLoaderCreateDynamic_V22
>;
export type CreateDynamicHandler<Loaded> = Handler<
  Loaded,
  | typeof HandlerLoaderCreateDynamic_V20
  | typeof HandlerLoaderCreateDynamic_V21
  | typeof HandlerLoaderCreateDynamic_V22
>;

/** ------------------------------------------------------------- */

export type CreateTranchedLoader = Loader<
  typeof HandlerLoaderCreateTranched_V22
>;
export type CreateTranchedHandler<Loaded> = Handler<
  Loaded,
  typeof HandlerLoaderCreateTranched_V22
>;

/** ------------------------------------------------------------- */

export type RenounceLoader = Loader<typeof HandlerLoaderRenounce_V20_V21_V22>;
export type RenounceHandler<Loaded> = Handler<
  Loaded,
  typeof HandlerLoaderRenounce_V20_V21_V22
>;

/** ------------------------------------------------------------- */

export type TransferLoader = Loader<typeof HandlerLoaderTransfer_V20_V21_V22>;
export type TransferHandler<Loaded> = Handler<
  Loaded,
  typeof HandlerLoaderTransfer_V20_V21_V22
>;

/** ------------------------------------------------------------- */

export type TransferAdminLoader = Loader<
  typeof HandlerLoaderTransferAdmin_V20_V21_V22
>;
export type TransferAdminHandler<Loaded> = Handler<
  Loaded,
  typeof HandlerLoaderTransferAdmin_V20_V21_V22
>;

/** ------------------------------------------------------------- */

export type WithdrawLoader = Loader<
  typeof HandlerLoaderWithdraw_V20 | typeof HandlerLoaderWithdraw_V21_V22
>;
export type WithdrawHandler<Loaded> = Handler<
  Loaded,
  typeof HandlerLoaderWithdraw_V20 | typeof HandlerLoaderWithdraw_V21_V22
>;

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type CreateLinearArgs =
  | EventCreateLinearArgs_V20
  | EventCreateLinearArgs_V21
  | EventCreateLinearArgs_V22;
export type CreateDynamicArgs =
  | EventCreateDynamicArgs_V20
  | EventCreateDynamicArgs_V21
  | EventCreateDynamicArgs_V22;
export type CreateTranchedArgs = EventCreateTranchedArgs_V22;
export type CancelArgs = EventCancelArgs_V20 | EventCancelArgs_V21_V22;
export type ApprovalArgs = EventApprovalArgs_V20_V21_V22;
export type ApprovalForAllArgs = EventApprovalForAllArgs_V20_V21_V22;
export type RenounceArgs = EventRenounceArgs_V20_V21_V22;
export type TransferArgs = EventTransferArgs_V20_V21_V22;
export type TransferAdminArgs = EventTransferAdminArgs_V20_V21_V22;
export type WithdrawArgs = EventWithdrawArgs_V20 | EventWithdrawArgs_V21_V22;

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type {
  Action,
  Asset,
  Batch,
  Batcher,
  Contract,
  Segment,
  Stream,
  Tranche,
  Watcher,
} from "../../generated/src/Types.gen";
