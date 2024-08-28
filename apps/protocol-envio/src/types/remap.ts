import type {
  EventLog,
  /** Event: Approval (NFT) */
  LockupV20_Approval_eventArgs as EventApprovalArgs_V20_V21_V22,
  /** Event: ApprovalForAll (NFT) */
  LockupV20Contract_ApprovalForAllEvent_eventArgs as EventApprovalForAllArgs_V20_V21_V22,
  LockupV20Contract_ApprovalForAllEvent_loaderContext as LoaderApprovalForAllContext_V20_V21_V22,
  LockupV20Contract_ApprovalForAllEvent_handlerContext as HandlerApprovalForAllContext_V20_V21_V22,
  /** Event: Cancel (Lockup) */
  LockupV20Contract_CancelLockupStreamEvent_eventArgs as EventCancelArgs_V20,
  LockupV20Contract_CancelLockupStreamEvent_loaderContext as LoaderCancelContext_V20,
  LockupV20Contract_CancelLockupStreamEvent_handlerContext as HandlerCancelContext_V20,
  LockupV21Contract_CancelLockupStreamEvent_eventArgs as EventCancelArgs_V21_V22,
  LockupV21Contract_CancelLockupStreamEvent_loaderContext as LoaderCancelContext_V21_V22,
  LockupV21Contract_CancelLockupStreamEvent_handlerContext as HandlerCancelContext_V21_V22,
  /** Event: Create Dynamic (Lockup) */
  LockupV20Contract_CreateLockupDynamicStreamEvent_eventArgs as EventCreateDynamicArgs_V20,
  LockupV20Contract_CreateLockupDynamicStreamEvent_loaderContext as LoaderCreateDynamicContext_V20,
  LockupV20Contract_CreateLockupDynamicStreamEvent_handlerContextAsync as HandlerCreateDynamicContext_V20,
  LockupV21Contract_CreateLockupDynamicStreamEvent_eventArgs as EventCreateDynamicArgs_V21,
  LockupV21Contract_CreateLockupDynamicStreamEvent_loaderContext as LoaderCreateDynamicContext_V21,
  LockupV21Contract_CreateLockupDynamicStreamEvent_handlerContextAsync as HandlerCreateDynamicContext_V21,
  LockupV22Contract_CreateLockupDynamicStreamEvent_eventArgs as EventCreateDynamicArgs_V22,
  LockupV22Contract_CreateLockupDynamicStreamEvent_loaderContext as LoaderCreateDynamicContext_V22,
  LockupV22Contract_CreateLockupDynamicStreamEvent_handlerContextAsync as HandlerCreateDynamicContext_V22,
  /** Event: Create Linear (Lockup) */
  LockupV20Contract_CreateLockupLinearStreamEvent_eventArgs as EventCreateLinearArgs_V20,
  LockupV20Contract_CreateLockupLinearStreamEvent_loaderContext as LoaderCreateLinearContext_V20,
  LockupV20Contract_CreateLockupLinearStreamEvent_handlerContextAsync as HandlerCreateLinearContext_V20,
  LockupV21Contract_CreateLockupLinearStreamEvent_eventArgs as EventCreateLinearArgs_V21,
  LockupV21Contract_CreateLockupLinearStreamEvent_loaderContext as LoaderCreateLinearContext_V21,
  LockupV21Contract_CreateLockupLinearStreamEvent_handlerContextAsync as HandlerCreateLinearContext_V21,
  LockupV22Contract_CreateLockupLinearStreamEvent_eventArgs as EventCreateLinearArgs_V22,
  LockupV22Contract_CreateLockupLinearStreamEvent_loaderContext as LoaderCreateLinearContext_V22,
  LockupV22Contract_CreateLockupLinearStreamEvent_handlerContextAsync as HandlerCreateLinearContext_V22,
  /** Event: Create Tranched (Lockup) */
  LockupV22Contract_CreateLockupTranchedStreamEvent_eventArgs as EventCreateTranchedArgs_V22,
  LockupV22Contract_CreateLockupTranchedStreamEvent_loaderContext as LoaderCreateTranchedContext_V22,
  LockupV22Contract_CreateLockupTranchedStreamEvent_handlerContextAsync as HandlerCreateTranchedContext_V22,
  /** Event: Renounce (Lockup) */
  LockupV20Contract_RenounceLockupStreamEvent_eventArgs as EventRenounceArgs_V20_V21_V22,
  LockupV20Contract_RenounceLockupStreamEvent_loaderContext as LoaderRenounceContext_V20_V21_V22,
  LockupV20Contract_RenounceLockupStreamEvent_handlerContext as HandlerRenounceContext_V20_V21_V22,
  /** Event: Transfer (NFT) */
  LockupV20Contract_TransferEvent_eventArgs as EventTransferArgs_V20_V21_V22,
  LockupV20Contract_TransferEvent_loaderContext as LoaderTransferContext_V20_V21_V22,
  LockupV20Contract_TransferEvent_handlerContext as HandlerTransferContext_V20_V21_V22,
  /** Event: TransferAdmin (Lockup) */
  LockupV20Contract_TransferAdminEvent_eventArgs as EventTransferAdminArgs_V20_V21_V22,
  LockupV20Contract_TransferAdminEvent_loaderContext as LoaderTransferAdminContext_V20_V21_V22,
  LockupV20Contract_TransferAdminEvent_handlerContext as HandlerTransferAdminContext_V20_V21_V22,
  /** Event: Withdraw (Lockup) */
  LockupV20Contract_WithdrawFromLockupStreamEvent_eventArgs as EventWithdrawArgs_V20,
  LockupV20Contract_WithdrawFromLockupStreamEvent_loaderContext as LoaderWithdrawContext_V20,
  LockupV20Contract_WithdrawFromLockupStreamEvent_handlerContext as HandlerWithdrawContext_V20,
  LockupV21Contract_WithdrawFromLockupStreamEvent_eventArgs as EventWithdrawArgs_V21_V22,
  LockupV21Contract_WithdrawFromLockupStreamEvent_loaderContext as LoaderWithdrawContext_V21_V22,
  LockupV21Contract_WithdrawFromLockupStreamEvent_handlerContext as HandlerWithdrawContext_V21_V22,
} from "../../generated/src/Types.gen";

import type { LockupV20_Approval_handlerWithLoader as HandlerApprovalContext_V20_V21_V22 } from "../../generated/src/Handlers.gen";

import type { registeredLoaderHandler as RegisteredLoaderHandler } from "../../generated/src/RegisteredEvents.gen";

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type Event<Params extends object = {}> = EventLog<Params>;
// export type Loader<HL> = Parameters<RegisteredLoaderHandler<HL, unknown>["loader"]>["0"];
// export type Handler<HL, Loaded> = Parameters<RegisteredLoader<HL, Loaded>["handler"]>["0"];

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

type Loader<T extends (_1: RegisteredLoaderHandler<object, unknown>) => void> =
  Parameters<Parameters<T>["0"]["loader"]>["0"];
type Handler<
  Loaded,
  T extends (_1: RegisteredLoaderHandler<object, Loaded>) => void,
> = Parameters<Parameters<T>["0"]["handler"]>["0"];

export type ApprovalLoader = Loader<typeof HandlerApprovalContext_V20_V21_V22>;
export type ApprovalHandler<Loaded> = Handler<
  Loaded,
  typeof HandlerApprovalContext_V20_V21_V22
>;

export type ApprovalForAllLoader = {
  context: LoaderApprovalForAllContext_V20_V21_V22;
  event: Event<EventApprovalForAllArgs_V20_V21_V22>;
};

export type ApprovalForAllHandler = {
  context: HandlerApprovalForAllContext_V20_V21_V22;
  event: Event<EventApprovalForAllArgs_V20_V21_V22>;
};

export type CancelLoader = {
  context: LoaderCancelContext_V20 | LoaderCancelContext_V21_V22;
  event: Event<EventCancelArgs_V20 | EventCancelArgs_V21_V22>;
};

export type CancelHandler = {
  context: HandlerCancelContext_V20 | HandlerCancelContext_V21_V22;
  event: Event<EventCancelArgs_V20 | EventCancelArgs_V21_V22>;
};

export type CreateLinearLoader = {
  context:
    | LoaderCreateLinearContext_V20
    | LoaderCreateLinearContext_V21
    | LoaderCreateLinearContext_V22;
  event: Event<
    | EventCreateLinearArgs_V20
    | EventCreateLinearArgs_V21
    | EventCreateLinearArgs_V22
  >;
};

export type CreateLinearHandler = {
  context:
    | HandlerCreateLinearContext_V20
    | HandlerCreateLinearContext_V21
    | HandlerCreateLinearContext_V22;
  event: Event<
    | EventCreateLinearArgs_V20
    | EventCreateLinearArgs_V21
    | EventCreateLinearArgs_V22
  >;
};

export type CreateDynamicLoader = {
  context:
    | LoaderCreateDynamicContext_V20
    | LoaderCreateDynamicContext_V21
    | LoaderCreateDynamicContext_V22;
  event: Event<
    | EventCreateDynamicArgs_V20
    | EventCreateDynamicArgs_V21
    | EventCreateDynamicArgs_V22
  >;
};

export type CreateDynamicHandler = {
  context:
    | HandlerCreateDynamicContext_V20
    | HandlerCreateDynamicContext_V21
    | HandlerCreateDynamicContext_V22;
  event: Event<
    | EventCreateDynamicArgs_V20
    | EventCreateDynamicArgs_V21
    | EventCreateDynamicArgs_V22
  >;
};

export type CreateTranchedLoader = {
  context: LoaderCreateTranchedContext_V22;
  event: Event<EventCreateTranchedArgs_V22>;
};

export type CreateTranchedHandler = {
  context: HandlerCreateTranchedContext_V22;
  event: Event<EventCreateTranchedArgs_V22>;
};

export type RenounceLoader = {
  context: LoaderRenounceContext_V20_V21_V22;
  event: Event<EventRenounceArgs_V20_V21_V22>;
};

export type RenounceHandler = {
  context: HandlerRenounceContext_V20_V21_V22;
  event: Event<EventRenounceArgs_V20_V21_V22>;
};

export type TransferLoader = {
  context: LoaderTransferContext_V20_V21_V22;
  event: Event<EventTransferArgs_V20_V21_V22>;
};

export type TransferHandler = {
  context: HandlerTransferContext_V20_V21_V22;
  event: Event<EventTransferArgs_V20_V21_V22>;
};

export type TransferAdminLoader = {
  context: LoaderTransferAdminContext_V20_V21_V22;
  event: Event<EventTransferAdminArgs_V20_V21_V22>;
};

export type TransferAdminHandler = {
  context: HandlerTransferAdminContext_V20_V21_V22;
  event: Event<EventTransferAdminArgs_V20_V21_V22>;
};

export type WithdrawLoader = {
  context: LoaderWithdrawContext_V20 | LoaderWithdrawContext_V21_V22;
  event: Event<EventWithdrawArgs_V20 | EventWithdrawArgs_V21_V22>;
};

export type WithdrawHandler = {
  context: HandlerWithdrawContext_V20 | HandlerWithdrawContext_V21_V22;
  event: Event<EventWithdrawArgs_V20 | EventWithdrawArgs_V21_V22>;
};

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
  ActionEntity as Action,
  AssetEntity as Asset,
  BatchEntity as Batch,
  BatcherEntity as Batcher,
  ContractEntity as Contract,
  SegmentEntity as Segment,
  StreamEntity as Stream,
  TrancheEntity as Tranche,
  WatcherEntity as Watcher,
} from "../../generated/src/Types.gen";
