import {
  LockupV20Contract_RenounceLockupStream_handler as HandlerLinear_V20,
  LockupV20Contract_RenounceLockupStream_loader as LoaderLinear_V20,
  LockupV21Contract_RenounceLockupStream_handler as HandlerLinear_V21_V22,
  LockupV21Contract_RenounceLockupStream_loader as LoaderLinear_V21_V22,
} from "../../generated/src/Handlers.gen";

import type { Action, RenounceHandler, RenounceLoader } from "../types";

import {
  createAction,
  generateStreamId,
  getOrCreateWatcher,
  getStream,
} from "../helpers";
import { ActionCategory } from "../constants";

function loader(input: RenounceLoader) {
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

function handler(input: RenounceHandler) {
  const { context, event } = input;

  /** ------- Fetch -------- */

  let watcher = getOrCreateWatcher(event, context.Watcher.get);
  let stream = getStream(event, event.params.streamId, context.Stream.get);

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
    renounceTime: BigInt(event.blockTimestamp),
  };

  context.Action.set(action);
  context.Stream.set(stream);
  context.Watcher.set(watcher);
}

LoaderLinear_V20(loader);
HandlerLinear_V20(handler);

LoaderLinear_V21_V22(loader);
HandlerLinear_V21_V22(handler);
