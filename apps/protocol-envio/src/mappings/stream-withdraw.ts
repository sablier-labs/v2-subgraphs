import {
  LockupV20Contract_WithdrawFromLockupStream_handler as HandlerLinear_V20,
  LockupV20Contract_WithdrawFromLockupStream_loader as LoaderLinear_V20,
  LockupV21Contract_WithdrawFromLockupStream_handler as HandlerLinear_V21,
  LockupV21Contract_WithdrawFromLockupStream_loader as LoaderLinear_V21,
} from "../../generated/src/Handlers.gen";

import type { Action, WithdrawHandler, WithdrawLoader } from "../types";

import {
  createAction,
  generateStreamId,
  getOrCreateWatcher,
  getStream,
} from "../helpers";
import { ActionCategory } from "../constants";

function loader(input: WithdrawLoader) {
  const { context, event } = input;

  const streamId = generateStreamId(
    event,
    event.srcAddress,
    event.params.streamId,
  );
  const watcherId = event.chainId.toString();

  context.Stream.load(streamId, {});
  context.Watcher.load(watcherId);
}

function handler(input: WithdrawHandler) {
  const { context, event } = input;

  /** ------- Fetch -------- */

  let watcher = getOrCreateWatcher(event, context.Watcher.get);
  let stream = getStream(event, event.params.streamId, context.Stream.get);

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Withdraw,
    stream: stream.id,

    /** --------------- */
    addressA: null, // TODO missing event.transaction.from
    addressB: event.params.to.toLowerCase(),
    amountB: event.params.amount,
  };

  watcher = post_action.watcher;

  /** --------------- */

  const amount = event.params.amount;
  const withdrawn = stream.withdrawnAmount + amount;

  stream = {
    ...stream,
    withdrawnAmount: withdrawn,
  };

  if (stream.canceledAction) {
    stream = {
      ...stream,
      intactAmount: stream.intactAmount - amount, // The intact amount (recipient) has been set in the cancel action, now subtract
    };
  } else {
    stream = {
      ...stream,
      intactAmount: stream.depositAmount - withdrawn,
    };
  }

  context.Action.set(action);
  context.Stream.set(stream);
  context.Watcher.set(watcher);
}

LoaderLinear_V20(loader);
HandlerLinear_V20(handler);

LoaderLinear_V21(loader);
HandlerLinear_V21(handler);
