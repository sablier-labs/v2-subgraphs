import {
  LockupV20Contract_RenounceLockupStream_handler as HandlerLinear_V20,
  LockupV20Contract_RenounceLockupStream_loader as LoaderLinear_V20,
} from "../src/Handlers.gen";

import type { Action, RenounceHandler_V20, RenounceLoader_V20 } from "../types";

import {
  createAction,
  generateStreamId,
  getOrCreateWatcher,
  getStream,
} from "../helpers";
import { ActionCategory } from "../constants";

function loader(input: RenounceLoader_V20) {
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

async function handler(input: RenounceHandler_V20) {
  const { context, event } = input;

  /** ------- Fetch -------- */

  let watcher = getOrCreateWatcher(event, context.Watcher.get);
  let stream = getStream(event, event.params.streamId, context.Stream.get);

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Renounce,
    stream: stream.id,
  };

  watcher = post_action.watcher;

  stream = {
    ...stream,
    cancelable: false,
    renounceAction: action.id,
    renounceTime: BigInt(event.blockTimestamp),
  };

  await context.Action.set(action);
  await context.Stream.set(stream);
  await context.Watcher.set(watcher);
}

LoaderLinear_V20(loader);
HandlerLinear_V20(handler);
