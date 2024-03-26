import {
  LockupV20Contract_ApprovalForAll_handler as HandlerLockup_V20_V21_V22,
  LockupV20Contract_ApprovalForAll_loader as LoaderLockup_V20_V21_V22,
} from "../../generated/src/Handlers.gen";

import type {
  Action,
  ApprovalForAllHandler,
  ApprovalForAllLoader,
} from "../types";

import { createAction, getOrCreateWatcher } from "../helpers";
import { ActionCategory } from "../constants";

function loader(input: ApprovalForAllLoader) {
  const { context, event } = input;
  const watcherId = event.chainId.toString();
  context.Watcher.load(watcherId);
}

function handler(input: ApprovalForAllHandler) {
  const { context, event } = input;

  /** ------- Fetch -------- */

  let watcher = getOrCreateWatcher(event, context.Watcher.get);

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Approval,
    stream_id: undefined,

    /** --------------- */
    addressA: event.params.owner.toLowerCase(),
    addressB: event.params.operator.toLowerCase(),
    amountA: event.params.approved ? 1n : 0n,
  };

  watcher = post_action.watcher;

  context.Action.set(action);
  context.Watcher.set(watcher);
}

LoaderLockup_V20_V21_V22(loader);
HandlerLockup_V20_V21_V22(handler);
