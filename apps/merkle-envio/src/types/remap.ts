import type {
  EventLog,
  /** Event: Create Linear (Factory) */
  MerkleLockupFactoryV21Contract_CreateMerkleStreamerLLEvent_eventArgs as EventCreateLinearArgs_V21,
  MerkleLockupFactoryV21Contract_CreateMerkleStreamerLLEvent_loaderContext as LoaderCreateLinearContext_V21,
  MerkleLockupFactoryV21Contract_CreateMerkleStreamerLLEvent_handlerContextAsync as HandlerCreateLinearContext_V21,
  MerkleLockupFactoryV22Contract_CreateMerkleLLEvent_eventArgs as EventCreateLinearArgs_V22,
  MerkleLockupFactoryV22Contract_CreateMerkleLLEvent_loaderContext as LoaderCreateLinearContext_V22,
  MerkleLockupFactoryV22Contract_CreateMerkleLLEvent_handlerContextAsync as HandlerCreateLinearContext_V22,
  /** Event: Create Tranched (Factory) */
  MerkleLockupFactoryV22Contract_CreateMerkleLTEvent_eventArgs as EventCreateTranchedArgs_V22,
  MerkleLockupFactoryV22Contract_CreateMerkleLTEvent_loaderContext as LoaderCreateTranchedContext_V22,
  MerkleLockupFactoryV22Contract_CreateMerkleLTEvent_handlerContextAsync as HandlerCreateTranchedContext_V22,
  /** Event: Claim (Merkle) */
  MerkleLockupV21Contract_ClaimEvent_eventArgs as EventClaimArgs_V21_V22,
  MerkleLockupV21Contract_ClaimEvent_loaderContext as LoaderClaimContext_V21_V22,
  MerkleLockupV21Contract_ClaimEvent_handlerContext as HandlerClaimContext_V21_V22,
  /** Event: Clawback (Merkle) */
  MerkleLockupV21Contract_ClawbackEvent_eventArgs as EventClawbackArgs_V21_V22,
  MerkleLockupV21Contract_ClawbackEvent_loaderContext as LoaderClawbackContext_V21_V22,
  MerkleLockupV21Contract_ClawbackEvent_handlerContext as HandlerClawbackContext_V21_V22,
  /** Event: Transfer Admin (Merkle) */
  MerkleLockupV21Contract_TransferAdminEvent_eventArgs as EventTransferAdminArgs_V21_V22,
  MerkleLockupV21Contract_TransferAdminEvent_loaderContext as LoaderTransferAdminContext_V21_V22,
  MerkleLockupV21Contract_TransferAdminEvent_handlerContext as HandlerTransferAdminContext_V21_V22,
} from "../../generated/src/Types.gen";

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type Event<Params extends object = {}> = EventLog<Params>;

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type CreateLinearLoader_V21 = {
  context: LoaderCreateLinearContext_V21;
  event: Event<EventCreateLinearArgs_V21>;
};

export type CreateLinearHandler_V21 = {
  context: HandlerCreateLinearContext_V21;
  event: Event<EventCreateLinearArgs_V21>;
};

export type CreateLinearLoader_V22 = {
  context: LoaderCreateLinearContext_V22;
  event: Event<EventCreateLinearArgs_V22>;
};

export type CreateLinearHandler_V22 = {
  context: HandlerCreateLinearContext_V22;
  event: Event<EventCreateLinearArgs_V22>;
};

export type CreateTranchedLoader_V22 = {
  context: LoaderCreateTranchedContext_V22;
  event: Event<EventCreateTranchedArgs_V22>;
};

export type CreateTranchedHandler_V22 = {
  context: HandlerCreateTranchedContext_V22;
  event: Event<EventCreateTranchedArgs_V22>;
};

export type ClaimLoader = {
  context: LoaderClaimContext_V21_V22;
  event: Event<EventClaimArgs_V21_V22>;
};

export type ClaimHandler = {
  context: HandlerClaimContext_V21_V22;
  event: Event<EventClaimArgs_V21_V22>;
};

export type ClawbackLoader = {
  context: LoaderClawbackContext_V21_V22;
  event: Event<EventClawbackArgs_V21_V22>;
};

export type ClawbackHandler = {
  context: HandlerClawbackContext_V21_V22;
  event: Event<EventClawbackArgs_V21_V22>;
};

export type TransferAdminLoader = {
  context: LoaderTransferAdminContext_V21_V22;
  event: Event<EventTransferAdminArgs_V21_V22>;
};

export type TransferAdminHandler = {
  context: HandlerTransferAdminContext_V21_V22;
  event: Event<EventTransferAdminArgs_V21_V22>;
};

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type CreateLinearArgs_V21 = EventCreateLinearArgs_V21;
export type CreateLinearArgs_V22 = EventCreateLinearArgs_V22;
export type CreateLinearArgs =
  | EventCreateLinearArgs_V21
  | EventCreateLinearArgs_V22;
export type CreateTranchedArgs_V22 = EventCreateTranchedArgs_V22;
export type CreateTranchedArgs = EventCreateTranchedArgs_V22;
export type ClaimArgs = EventClaimArgs_V21_V22;
export type ClawbackArgs = EventClawbackArgs_V21_V22;
export type TransferAdminArgs = EventTransferAdminArgs_V21_V22;

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type {
  ActionEntity as Action,
  ActivityEntity as Activity,
  AssetEntity as Asset,
  CampaignEntity as Campaign,
  FactoryEntity as Factory,
  TrancheEntity as Tranche,
  WatcherEntity as Watcher,
} from "../../generated/src/Types.gen";
