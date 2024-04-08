import {
  LockupV20Contract_CancelLockupStream_handler as HandlerLockup_V20,
  LockupV20Contract_CancelLockupStream_loader as LoaderLockup_V20,
  LockupV21Contract_CancelLockupStream_handler as HandlerLockup_V21,
  LockupV21Contract_CancelLockupStream_loader as LoaderLockup_V21,
  LockupV22Contract_CancelLockupStream_handler as HandlerLockup_V22,
  LockupV22Contract_CancelLockupStream_loader as LoaderLockup_V22,
} from "../../generated/src/Handlers.gen";

import type { Action, CancelHandler, CancelLoader } from "../types";

import {
  createAction,
  generateStreamId,
  getOrCreateWatcher,
  getStream,
} from "../helpers";
import { ActionCategory } from "../constants";

function loader(input: CancelLoader) {
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

function handler(input: CancelHandler) {
  const { context, event } = input;

  /** ------- Fetch -------- */

  let watcher = getOrCreateWatcher(event, context.Watcher.get);
  let stream = getStream(event, event.params.streamId, context.Stream.get);

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Cancel,
    stream_id: stream.id,
    /** --------------- */
    addressA: event.params.sender.toLowerCase(),
    addressB: event.params.recipient.toLowerCase(),
    amountA: event.params.senderAmount,
    amountB: event.params.recipientAmount,
  };

  watcher = post_action.watcher;

  stream = {
    ...stream,
    cancelable: false,
    canceled: true,
    canceledAction_id: action.id,
    canceledTime: BigInt(event.blockTimestamp),
    intactAmount: event.params.recipientAmount, // The only amount remaining in the stream is the non-withdrawn recipient amount
  };

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
