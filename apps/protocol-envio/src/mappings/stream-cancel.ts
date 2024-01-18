import {
  LockupV20Contract_CancelLockupStream_handler as HandlerLinear_V20,
  LockupV20Contract_CancelLockupStream_loader as LoaderLinear_V20,
} from "../src/Handlers.gen";

import type { Action, CancelHandler_V20, CancelLoader_V20 } from "../types";

import {
  createAction,
  generateStreamId,
  getOrCreateWatcher,
  getStream,
} from "../helpers";
import { ActionCategory } from "../constants";

function loader(input: CancelLoader_V20) {
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

async function handler(input: CancelHandler_V20) {
  const { context, event } = input;

  /** ------- Fetch -------- */

  let watcher = getOrCreateWatcher(event, context.Watcher.get);
  let stream = getStream(event, event.params.streamId, context.Stream.get);

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Cancel,
    stream: stream.id,
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
    canceledAction: action.id,
    canceledTime: BigInt(event.blockTimestamp),
    intactAmount: event.params.recipientAmount, // The only amount remaining in the stream is the non-withdrawn recipient amount
  };

  await context.Action.set(action);
  await context.Stream.set(stream);
  await context.Watcher.set(watcher);
}

LoaderLinear_V20(loader);
HandlerLinear_V20(handler);
