import { WatcherEntity as Watcher } from "../src/Types.gen";
import type { Event } from "../constants";
import { one } from "../constants";
import { initializeContracts } from "./contract";

function createWatcher(event: Event): Watcher {
  const entity: Watcher = {
    id: event.chainId.toString(),
    chainId: BigInt(event.chainId),
    actionIndex: one,
    streamIndex: one,
    initialized: true,
    logs: [],
  };

  return entity;
}

export function getOrCreateWatcher(
  event: Event,
  loader: (id: string) => Watcher | undefined,
) {
  const watcher = loader(event.chainId.toString());

  if (watcher === undefined) {
    initializeContracts(event);

    return createWatcher(event);
  }

  return watcher;
}

export async function getOrCreateWatcher_async(
  event: Event,
  loader: (id: string) => Watcher | undefined,
) {
  const watcher = await loader(event.chainId.toString());

  if (watcher === undefined) {
    initializeContracts(event);

    return createWatcher(event);
  }

  return watcher;
}
