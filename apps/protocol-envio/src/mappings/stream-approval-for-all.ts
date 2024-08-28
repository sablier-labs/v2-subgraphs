import type {
  Action,
  ApprovalForAllHandler,
  ApprovalForAllLoader,
} from "../types";
import { LockupV20, LockupV21, LockupV22 } from "../../generated";
import { createAction, getOrCreateWatcher } from "../helpers";
import { ActionCategory } from "../constants";

async function loader(input: ApprovalForAllLoader) {
  const { context, event } = input;
  const watcherId = event.chainId.toString();
  const [Watcher] = await Promise.all([context.Watcher.get(watcherId)]);

  return {
    Watcher,
  };
}

async function handler(input: ApprovalForAllHandler<typeof loader>) {
  const { context, event } = input;

  /** ------- Fetch -------- */

  let watcher = await getOrCreateWatcher(event, context.Watcher.get);

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

LockupV20.ApprovalForAll.handlerWithLoader({
  loader,
  handler,
});

LockupV21.ApprovalForAll.handlerWithLoader({
  loader,
  handler,
});

LockupV22.ApprovalForAll.handlerWithLoader({
  loader,
  handler,
});
