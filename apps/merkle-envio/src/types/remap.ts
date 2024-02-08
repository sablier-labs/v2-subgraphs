import type {
  EventLog,
  /** Event: Create (Factory) */
  MerkleLockupFactoryV21Contract_CreateMerkleStreamerLLEvent_eventArgs as EventCreateLinearArgs_V21,
  MerkleLockupFactoryV21Contract_CreateMerkleStreamerLLEvent_loaderContext as LoaderCreateLinearContext_V21,
  MerkleLockupFactoryV21Contract_CreateMerkleStreamerLLEvent_handlerContextAsync as HandlerCreateLinearContext_V21,
  /** Event: Claim (Merkle) */
  MerkleLLV21Contract_ClaimEvent_eventArgs as EventClaimArgs_V21,
  MerkleLLV21Contract_ClaimEvent_loaderContext as LoaderClaimContext_V21,
  MerkleLLV21Contract_ClaimEvent_handlerContext as HandlerClaimContext_V21,
  /** Event: Clawback (Merkle) */
  MerkleLLV21Contract_ClawbackEvent_eventArgs as EventClawbackArgs_V21,
  MerkleLLV21Contract_ClawbackEvent_loaderContext as LoaderClawbackContext_V21,
  MerkleLLV21Contract_ClawbackEvent_handlerContext as HandlerClawbackContext_V21,
  /** Event: Transfer Admin (Merkle) */
  MerkleLLV21Contract_TransferAdminEvent_eventArgs as EventTransferAdminArgs_V21,
  MerkleLLV21Contract_TransferAdminEvent_loaderContext as LoaderTransferAdminContext_V21,
  MerkleLLV21Contract_TransferAdminEvent_handlerContext as HandlerTransferAdminContext_V21,
} from "../../generated/src/Types.gen";

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type Event<Params extends object = {}> = EventLog<Params>;

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type CreateLinearLoader = {
  context: LoaderCreateLinearContext_V21;
  event: Event<EventCreateLinearArgs_V21>;
};

export type CreateLinearHandler = {
  context: HandlerCreateLinearContext_V21;
  event: Event<EventCreateLinearArgs_V21>;
};

export type ClaimLoader = {
  context: LoaderClaimContext_V21;
  event: Event<EventClaimArgs_V21>;
};

export type ClaimHandler = {
  context: HandlerClaimContext_V21;
  event: Event<EventClaimArgs_V21>;
};

export type ClawbackLoader = {
  context: LoaderClawbackContext_V21;
  event: Event<EventClawbackArgs_V21>;
};

export type ClawbackHandler = {
  context: HandlerClawbackContext_V21;
  event: Event<EventClawbackArgs_V21>;
};

export type TransferAdminLoader = {
  context: LoaderTransferAdminContext_V21;
  event: Event<EventTransferAdminArgs_V21>;
};

export type TransferAdminHandler = {
  context: HandlerTransferAdminContext_V21;
  event: Event<EventTransferAdminArgs_V21>;
};

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type CreateLinearArgs = EventCreateLinearArgs_V21;
export type ClaimArgs = EventClaimArgs_V21;
export type ClawbackArgs = EventClawbackArgs_V21;
export type TransferAdminArgs = EventTransferAdminArgs_V21;

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export type {
  ActionEntity as Action,
  ActivityEntity as Activity,
  AssetEntity as Asset,
  CampaignEntity as Campaign,
  FactoryEntity as Factory,
  WatcherEntity as Watcher,
} from "../../generated/src/Types.gen";
