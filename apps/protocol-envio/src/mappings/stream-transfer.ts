import {
  LockupV20Contract_Transfer_handler as HandlerLinear_V20,
  LockupV20Contract_Transfer_loader as LoaderLinear_V20,
  LockupV21Contract_Transfer_handler as HandlerLinear_V21,
  LockupV21Contract_Transfer_loader as LoaderLinear_V21,
} from "../../generated/src/Handlers.gen";

import type { Action, TransferHandler, TransferLoader } from "../types";

import {
  createAction,
  generateStreamId,
  getOrCreateWatcher,
  getStream,
} from "../helpers";
import { ADDRESS_ZERO, ActionCategory } from "../constants";

function loader(input: TransferLoader) {
  const { context, event } = input;

  const streamId = generateStreamId(
    event,
    event.srcAddress,
    event.params.tokenId,
  );
  const watcherId = event.chainId.toString();

  context.Stream.load(streamId, {});
  context.Watcher.load(watcherId);
}

function handler(input: TransferHandler) {
  const { context, event } = input;

  /**
   * As described in issue #18, we will first filter out
   * any `Transfer` events emitted by the initial mint transaction
   */

  if (event.params.from.toLowerCase() === ADDRESS_ZERO.toLowerCase()) {
    return;
  }

  /** ------- Fetch -------- */

  let watcher = getOrCreateWatcher(event, context.Watcher.get);
  let stream = getStream(event, event.params.tokenId, context.Stream.get);

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Transfer,
    stream: stream.id,

    /** --------------- */
    addressA: event.params.from.toLowerCase(),
    addressB: event.params.to.toLowerCase(),
  };

  watcher = post_action.watcher;

  stream = {
    ...stream,
    recipient: event.params.to.toLowerCase(),
    parties: [stream.sender, event.params.to.toLowerCase()],
  };

  if (stream.proxied) {
    if (stream.proxender) {
      stream = {
        ...stream,
        parties: [...stream.parties, stream.proxender],
      };
    }
  }

  context.Action.set(action);
  context.Stream.set(stream);
  context.Watcher.set(watcher);
}

LoaderLinear_V20(loader);
HandlerLinear_V20(handler);

LoaderLinear_V21(loader);
HandlerLinear_V21(handler);
