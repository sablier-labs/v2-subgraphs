import type {
  EventLog,
  /** Event: Approval (NFT) */
  LockupV20Contract_ApprovalEvent_eventArgs as EventApprovalArgs_V20,
  LockupV20Contract_ApprovalEvent_loaderContext as LoaderApprovalContext_V20,
  LockupV20Contract_ApprovalEvent_handlerContext as HandlerApprovalContext_V20,
  LockupV21Contract_ApprovalEvent_eventArgs as EventApprovalArgs_V21,
  LockupV21Contract_ApprovalEvent_loaderContext as LoaderApprovalContext_V21,
  LockupV21Contract_ApprovalEvent_handlerContext as HandlerApprovalContext_V21,
  /** Event: ApprovalForAll (NFT) */
  LockupV20Contract_ApprovalForAllEvent_eventArgs as EventApprovalForAllArgs_V20,
  LockupV20Contract_ApprovalForAllEvent_loaderContext as LoaderApprovalForAllContext_V20,
  LockupV20Contract_ApprovalForAllEvent_handlerContext as HandlerApprovalForAllContext_V20,
  LockupV21Contract_ApprovalForAllEvent_eventArgs as EventApprovalForAllArgs_V21,
  LockupV21Contract_ApprovalForAllEvent_loaderContext as LoaderApprovalForAllContext_V21,
  LockupV21Contract_ApprovalForAllEvent_handlerContext as HandlerApprovalForAllContext_V21,
  /** Event: Cancel (Lockup) */
  LockupV20Contract_CancelLockupStreamEvent_eventArgs as EventCancelArgs_V20,
  LockupV20Contract_CancelLockupStreamEvent_loaderContext as LoaderCancelContext_V20,
  LockupV20Contract_CancelLockupStreamEvent_handlerContext as HandlerCancelContext_V20,
  LockupV21Contract_CancelLockupStreamEvent_eventArgs as EventCancelArgs_V21,
  LockupV21Contract_CancelLockupStreamEvent_loaderContext as LoaderCancelContext_V21,
  LockupV21Contract_CancelLockupStreamEvent_handlerContext as HandlerCancelContext_V21,
  /** Event: Create Dynamic (Lockup) */
  LockupV20Contract_CreateLockupDynamicStreamEvent_eventArgs as EventCreateDynamicArgs_V20,
  LockupV20Contract_CreateLockupDynamicStreamEvent_loaderContext as LoaderCreateDynamicContext_V20,
  LockupV20Contract_CreateLockupDynamicStreamEvent_handlerContextAsync as HandlerCreateDynamicContext_V20,
  LockupV21Contract_CreateLockupDynamicStreamEvent_eventArgs as EventCreateDynamicArgs_V21,
  LockupV21Contract_CreateLockupDynamicStreamEvent_loaderContext as LoaderCreateDynamicContext_V21,
  LockupV21Contract_CreateLockupDynamicStreamEvent_handlerContextAsync as HandlerCreateDynamicContext_V21,
  /** Event: Create Linear (Lockup) */
  LockupV20Contract_CreateLockupLinearStreamEvent_eventArgs as EventCreateLinearArgs_V20,
  LockupV20Contract_CreateLockupLinearStreamEvent_loaderContext as LoaderCreateLinearContext_V20,
  LockupV20Contract_CreateLockupLinearStreamEvent_handlerContextAsync as HandlerCreateLinearContext_V20,
  LockupV21Contract_CreateLockupLinearStreamEvent_eventArgs as EventCreateLinearArgs_V21,
  LockupV21Contract_CreateLockupLinearStreamEvent_loaderContext as LoaderCreateLinearContext_V21,
  LockupV21Contract_CreateLockupLinearStreamEvent_handlerContextAsync as HandlerCreateLinearContext_V21,
  /** Event: Renounce (Lockup) */
  LockupV20Contract_RenounceLockupStreamEvent_eventArgs as EventRenounceArgs_V20,
  LockupV20Contract_RenounceLockupStreamEvent_loaderContext as LoaderRenounceContext_V20,
  LockupV20Contract_RenounceLockupStreamEvent_handlerContext as HandlerRenounceContext_V20,
  LockupV21Contract_RenounceLockupStreamEvent_eventArgs as EventRenounceArgs_V21,
  LockupV21Contract_RenounceLockupStreamEvent_loaderContext as LoaderRenounceContext_V21,
  LockupV21Contract_RenounceLockupStreamEvent_handlerContext as HandlerRenounceContext_V21,
  /** Event: Transfer (NFT) */
  LockupV20Contract_TransferEvent_eventArgs as EventTransferArgs_V20,
  LockupV20Contract_TransferEvent_loaderContext as LoaderTransferContext_V20,
  LockupV20Contract_TransferEvent_handlerContext as HandlerTransferContext_V20,
  LockupV21Contract_TransferEvent_eventArgs as EventTransferArgs_V21,
  LockupV21Contract_TransferEvent_loaderContext as LoaderTransferContext_V21,
  LockupV21Contract_TransferEvent_handlerContext as HandlerTransferContext_V21,
  /** Event: TransferAdmin (Lockup) */
  LockupV20Contract_TransferAdminEvent_eventArgs as EventTransferAdminArgs_V20,
  LockupV20Contract_TransferAdminEvent_loaderContext as LoaderTransferAdminContext_V20,
  LockupV20Contract_TransferAdminEvent_handlerContext as HandlerTransferAdminContext_V20,
  LockupV21Contract_TransferAdminEvent_eventArgs as EventTransferAdminArgs_V21,
  LockupV21Contract_TransferAdminEvent_loaderContext as LoaderTransferAdminContext_V21,
  LockupV21Contract_TransferAdminEvent_handlerContext as HandlerTransferAdminContext_V21,
  /** Event: Renounce (Lockup) */
  LockupV20Contract_WithdrawFromLockupStreamEvent_eventArgs as EventWithdrawArgs_V20,
  LockupV20Contract_WithdrawFromLockupStreamEvent_loaderContext as LoaderWithdrawContext_V20,
  LockupV20Contract_WithdrawFromLockupStreamEvent_handlerContext as HandlerWithdrawContext_V20,
  LockupV21Contract_WithdrawFromLockupStreamEvent_eventArgs as EventWithdrawArgs_V21,
  LockupV21Contract_WithdrawFromLockupStreamEvent_loaderContext as LoaderWithdrawContext_V21,
  LockupV21Contract_WithdrawFromLockupStreamEvent_handlerContext as HandlerWithdrawContext_V21,
} from "../../generated/src/Types.gen";

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type Event<Params extends object = {}> = EventLog<Params>;

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type ApprovalLoader = {
  context: LoaderApprovalContext_V20 | LoaderApprovalContext_V21;
  event: Event<EventApprovalArgs_V20 | EventApprovalArgs_V21>;
};

export type ApprovalHandler = {
  context: HandlerApprovalContext_V20 | HandlerApprovalContext_V21;
  event: Event<EventApprovalArgs_V20 | EventApprovalArgs_V21>;
};

export type ApprovalForAllLoader = {
  context: LoaderApprovalForAllContext_V20 | LoaderApprovalForAllContext_V21;
  event: Event<EventApprovalForAllArgs_V20 | EventApprovalForAllArgs_V21>;
};

export type ApprovalForAllHandler = {
  context: HandlerApprovalForAllContext_V20 | HandlerApprovalForAllContext_V21;
  event: Event<EventApprovalForAllArgs_V20 | EventApprovalForAllArgs_V21>;
};

export type CancelLoader = {
  context: LoaderCancelContext_V20 | LoaderCancelContext_V21;
  event: Event<EventCancelArgs_V20 | EventCancelArgs_V21>;
};

export type CancelHandler = {
  context: HandlerCancelContext_V20 | HandlerCancelContext_V21;
  event: Event<EventCancelArgs_V20 | EventCancelArgs_V21>;
};

export type CreateLinearLoader = {
  context: LoaderCreateLinearContext_V20 | LoaderCreateLinearContext_V21;
  event: Event<EventCreateLinearArgs_V20 | EventCreateLinearArgs_V21>;
};

export type CreateLinearHandler = {
  context: HandlerCreateLinearContext_V20 | HandlerCreateLinearContext_V21;
  event: Event<EventCreateLinearArgs_V20 | EventCreateLinearArgs_V21>;
};

export type CreateDynamicLoader = {
  context: LoaderCreateDynamicContext_V20 | LoaderCreateDynamicContext_V21;
  event: Event<EventCreateDynamicArgs_V20 | EventCreateDynamicArgs_V21>;
};

export type CreateDynamicHandler = {
  context: HandlerCreateDynamicContext_V20 | HandlerCreateDynamicContext_V21;
  event: Event<EventCreateDynamicArgs_V20 | EventCreateDynamicArgs_V21>;
};

export type RenounceLoader = {
  context: LoaderRenounceContext_V20 | LoaderRenounceContext_V21;
  event: Event<EventRenounceArgs_V20 | EventRenounceArgs_V21>;
};

export type RenounceHandler = {
  context: HandlerRenounceContext_V20 | HandlerRenounceContext_V21;
  event: Event<EventRenounceArgs_V20 | EventRenounceArgs_V21>;
};

export type TransferLoader = {
  context: LoaderTransferContext_V20 | LoaderTransferContext_V21;
  event: Event<EventTransferArgs_V20 | EventTransferArgs_V21>;
};

export type TransferHandler = {
  context: HandlerTransferContext_V20 | HandlerTransferContext_V21;
  event: Event<EventTransferArgs_V20 | EventTransferArgs_V21>;
};

export type TransferAdminLoader = {
  context: LoaderTransferAdminContext_V20 | LoaderTransferAdminContext_V21;
  event: Event<EventTransferAdminArgs_V20 | EventTransferAdminArgs_V21>;
};

export type TransferAdminHandler = {
  context: HandlerTransferAdminContext_V20 | HandlerTransferAdminContext_V21;
  event: Event<EventTransferAdminArgs_V20 | EventTransferAdminArgs_V21>;
};

export type WithdrawLoader = {
  context: LoaderWithdrawContext_V20 | LoaderWithdrawContext_V21;
  event: Event<EventWithdrawArgs_V20 | EventWithdrawArgs_V21>;
};

export type WithdrawHandler = {
  context: HandlerWithdrawContext_V20 | HandlerWithdrawContext_V21;
  event: Event<EventWithdrawArgs_V20 | EventWithdrawArgs_V21>;
};

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type CreateLinearArgs =
  | EventCreateLinearArgs_V20
  | EventCreateLinearArgs_V21;
export type CreateDynamicArgs =
  | EventCreateDynamicArgs_V20
  | EventCreateDynamicArgs_V21;
export type CancelArgs = EventCancelArgs_V20 | EventCancelArgs_V21;
export type ApprovalArgs = EventApprovalArgs_V20 | EventApprovalArgs_V21;
export type ApprovalForAllArgs =
  | EventApprovalForAllArgs_V20
  | EventApprovalForAllArgs_V21;
export type RenounceArgs = EventRenounceArgs_V20 | EventRenounceArgs_V21;
export type TransferArgs = EventTransferArgs_V20 | EventTransferArgs_V21;
export type TransferAdminArgs =
  | EventTransferAdminArgs_V20
  | EventTransferAdminArgs_V21;
export type WithdrawArgs = EventWithdrawArgs_V20 | EventWithdrawArgs_V21;

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type {
  ActionEntity as Action,
  AssetEntity as Asset,
  BatchEntity as Batch,
  BatcherEntity as Batcher,
  ContractEntity as Contract,
  SegmentEntity as Segment,
  StreamEntity as Stream,
  WatcherEntity as Watcher,
} from "../../generated/src/Types.gen";
