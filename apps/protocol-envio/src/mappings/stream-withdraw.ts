import {
  LockupV20Contract_WithdrawFromLockupStream_handler as HandlerLockup_V20,
  LockupV20Contract_WithdrawFromLockupStream_loader as LoaderLockup_V20,
  LockupV21Contract_WithdrawFromLockupStream_handler as HandlerLockup_V21,
  LockupV21Contract_WithdrawFromLockupStream_loader as LoaderLockup_V21,
  LockupV22Contract_WithdrawFromLockupStream_handler as HandlerLockup_V22,
  LockupV22Contract_WithdrawFromLockupStream_loader as LoaderLockup_V22,
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
    stream_id: stream.id,

    /** --------------- */
    addressA: event.txOrigin?.toLowerCase() || "",
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

  if (stream.canceledAction_id) {
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

LoaderLockup_V20(loader);
HandlerLockup_V20(handler);

LoaderLockup_V21(loader);
HandlerLockup_V21(handler);

LoaderLockup_V22(loader);
HandlerLockup_V22(handler);
