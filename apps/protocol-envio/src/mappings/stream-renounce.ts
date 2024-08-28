import { LockupV20, LockupV21, LockupV22 } from "../../generated";
import type { Action, RenounceHandler, RenounceLoader } from "../types";

import {
  createAction,
  generateStreamId,
  getOrCreateWatcher,
  getStream,
} from "../helpers";
import { ActionCategory } from "../constants";

async function loader(input: RenounceLoader) {
  const { context, event } = input;

  const streamId = generateStreamId(
    event,
    event.srcAddress,
    event.params.streamId,
  );
  const watcherId = event.chainId.toString();

  const [Stream, Watcher] = await Promise.all([
    context.Stream.get(streamId),
    context.Watcher.get(watcherId),
  ]);

  return {
    Stream,
    Watcher,
  };
}

async function handler(input: RenounceHandler<typeof loader>) {
  const { context, event } = input;

  /** ------- Fetch -------- */

  let watcher = await getOrCreateWatcher(event, context.Watcher.get);
  let stream = await getStream(
    event,
    event.params.streamId,
    context.Stream.get,
  );

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Renounce,
    stream_id: stream.id,
  };

  watcher = post_action.watcher;

  stream = {
    ...stream,
    cancelable: false,
    renounceAction_id: action.id,
    renounceTime: BigInt(event.block.timestamp),
  };

  context.Action.set(action);
  context.Stream.set(stream);
  context.Watcher.set(watcher);
}

LockupV20.RenounceLockupStream.handlerWithLoader({
  loader,
  handler,
});

LockupV21.RenounceLockupStream.handlerWithLoader({
  loader,
  handler,
});

LockupV22.RenounceLockupStream.handlerWithLoader({
  loader,
  handler,
});
