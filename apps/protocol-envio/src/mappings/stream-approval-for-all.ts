import {
  LockupV20Contract_ApprovalForAll_handler as HandlerLinear_V20,
  LockupV20Contract_ApprovalForAll_loader as LoaderLinear_V20,
  LockupV21Contract_ApprovalForAll_handler as HandlerLinear_V21,
  LockupV21Contract_ApprovalForAll_loader as LoaderLinear_V21,
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
    stream: null,

    /** --------------- */
    addressA: event.params.owner.toLowerCase(),
    addressB: event.params.operator.toLowerCase(),
    amountA: event.params.approved ? 1n : 0n,
  };

  watcher = post_action.watcher;

  context.Action.set(action);
  context.Watcher.set(watcher);
}

LoaderLinear_V20(loader);
HandlerLinear_V20(handler);

LoaderLinear_V21(loader);
HandlerLinear_V21(handler);
