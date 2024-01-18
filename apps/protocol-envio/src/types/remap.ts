import type {
  EventLog,
  /** Event: Approval (NFT) */
  LockupV20Contract_ApprovalEvent_eventArgs as EventApprovalArgs_V20,
  LockupV20Contract_ApprovalEvent_loaderContext as LoaderApprovalContext_V20,
  LockupV20Contract_ApprovalEvent_handlerContext as HandlerApprovalContext_V20,
  /** Event: ApprovalForAll (NFT) */
  LockupV20Contract_ApprovalForAllEvent_eventArgs as EventApprovalForAllArgs_V20,
  LockupV20Contract_ApprovalForAllEvent_loaderContext as LoaderApprovalForAllContext_V20,
  LockupV20Contract_ApprovalForAllEvent_handlerContext as HandlerApprovalForAllContext_V20,
  /** Event: Cancel (Lockup) */
  LockupV20Contract_CancelLockupStreamEvent_eventArgs as EventCancelArgs_V20,
  LockupV20Contract_CancelLockupStreamEvent_loaderContext as LoaderCancelContext_V20,
  LockupV20Contract_CancelLockupStreamEvent_handlerContext as HandlerCancelContext_V20,
  /** Event: Create (Lockup) */
  LockupV20Contract_CreateLockupLinearStreamEvent_eventArgs as EventCreateLinearArgs_V20,
  LockupV20Contract_CreateLockupLinearStreamEvent_loaderContext as LoaderCreateLinearContext_V20,
  LockupV20Contract_CreateLockupLinearStreamEvent_handlerContextAsync as HandlerCreateLinearContext_V20,
  LockupV20Contract_CreateLockupDynamicStreamEvent_eventArgs as EventCreateDynamicArgs_V20,
  LockupV20Contract_CreateLockupDynamicStreamEvent_loaderContext as LoaderCreateDynamicContext_V20,
  LockupV20Contract_CreateLockupDynamicStreamEvent_handlerContextAsync as HandlerCreateDynamicContext_V20,
  /** Event: Renounce (Lockup) */
  LockupV20Contract_RenounceLockupStreamEvent_eventArgs as EventRenounceArgs_V20,
  LockupV20Contract_RenounceLockupStreamEvent_loaderContext as LoaderRenounceContext_V20,
  LockupV20Contract_RenounceLockupStreamEvent_handlerContext as HandlerRenounceContext_V20,
  /** Event: Transfer (NFT) */
  LockupV20Contract_TransferEvent_eventArgs as EventTransferArgs_V20,
  LockupV20Contract_TransferEvent_loaderContext as LoaderTransferContext_V20,
  LockupV20Contract_TransferEvent_handlerContext as HandlerTransferContext_V20,
  /** Event: TransferAdmin (Lockup) */
  LockupV20Contract_TransferAdminEvent_eventArgs as EventTransferAdminArgs_V20,
  LockupV20Contract_TransferAdminEvent_loaderContext as LoaderTransferAdminContext_V20,
  LockupV20Contract_TransferAdminEvent_handlerContext as HandlerTransferAdminContext_V20,
  /** Event: Renounce (Lockup) */
  LockupV20Contract_WithdrawFromLockupStreamEvent_eventArgs as EventWithdrawArgs_V20,
  LockupV20Contract_WithdrawFromLockupStreamEvent_loaderContext as LoaderWithdrawContext_V20,
  LockupV20Contract_WithdrawFromLockupStreamEvent_handlerContext as HandlerWithdrawContext_V20,
} from "../../generated/src/Types.gen";

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

export type Event<Params extends object = {}> = EventLog<Params>;

export type ApprovalLoader_V20 = {
  context: LoaderApprovalContext_V20;
  event: Event<EventApprovalArgs_V20>;
};

export type ApprovalHandler_V20 = {
  context: HandlerApprovalContext_V20;
  event: Event<EventApprovalArgs_V20>;
};

export type ApprovalForAllLoader_V20 = {
  context: LoaderApprovalForAllContext_V20;
  event: Event<EventApprovalForAllArgs_V20>;
};

export type ApprovalForAllHandler_V20 = {
  context: HandlerApprovalForAllContext_V20;
  event: Event<EventApprovalForAllArgs_V20>;
};

export type CancelLoader_V20 = {
  context: LoaderCancelContext_V20;
  event: Event<EventCancelArgs_V20>;
};

export type CancelHandler_V20 = {
  context: HandlerCancelContext_V20;
  event: Event<EventCancelArgs_V20>;
};

export type CreateLinearLoader_V20 = {
  context: LoaderCreateLinearContext_V20;
  event: Event<EventCreateLinearArgs_V20>;
};

export type CreateLinearHandler_V20 = {
  context: HandlerCreateLinearContext_V20;
  event: Event<EventCreateLinearArgs_V20>;
};

export type CreateDynamicLoader_V20 = {
  context: LoaderCreateDynamicContext_V20;
  event: Event<EventCreateDynamicArgs_V20>;
};

export type CreateDynamicHandler_V20 = {
  context: HandlerCreateDynamicContext_V20;
  event: Event<EventCreateDynamicArgs_V20>;
};

export type RenounceLoader_V20 = {
  context: LoaderRenounceContext_V20;
  event: Event<EventRenounceArgs_V20>;
};

export type RenounceHandler_V20 = {
  context: HandlerRenounceContext_V20;
  event: Event<EventRenounceArgs_V20>;
};

export type TransferLoader_V20 = {
  context: LoaderTransferContext_V20;
  event: Event<EventTransferArgs_V20>;
};

export type TransferHandler_V20 = {
  context: HandlerTransferContext_V20;
  event: Event<EventTransferArgs_V20>;
};

export type TransferAdminLoader_V20 = {
  context: LoaderTransferAdminContext_V20;
  event: Event<EventTransferAdminArgs_V20>;
};

export type TransferAdminHandler_V20 = {
  context: HandlerTransferAdminContext_V20;
  event: Event<EventTransferAdminArgs_V20>;
};

export type WithdrawLoader_V20 = {
  context: LoaderWithdrawContext_V20;
  event: Event<EventWithdrawArgs_V20>;
};

export type WithdrawHandler_V20 = {
  context: HandlerWithdrawContext_V20;
  event: Event<EventWithdrawArgs_V20>;
};

export type CreateLinearArgs = EventCreateLinearArgs_V20;
export type CreateDynamicArgs = EventCreateDynamicArgs_V20;
export type CancelArgs = EventCancelArgs_V20;
export type ApprovalArgs = EventApprovalArgs_V20;
export type ApprovalForAllArgs = EventApprovalForAllArgs_V20;
export type RenounceArgs = EventRenounceArgs_V20;
export type TransferArgs = EventTransferArgs_V20;
export type TransferAdminArgs = EventTransferAdminArgs_V20;
export type WithdrawArgs = EventWithdrawArgs_V20;

export type { EventCreateLinearArgs_V20, EventCreateDynamicArgs_V20 };
