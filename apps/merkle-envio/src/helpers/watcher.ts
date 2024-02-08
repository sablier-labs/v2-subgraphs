import type { Factory, Event, Watcher } from "../types";
import {
  _initialize,
  generateFactoryId,
  getFactory,
  getFactory_async,
} from "./factory";

export async function initialize_async(
  event: Event,
  loaderWatcher: (id: string) => Promise<Watcher | undefined>,
  loaderFactory: (id: string) => Promise<Factory | undefined>,
) {
  const watcher = await getOrCreateWatcher_async(event, loaderWatcher);

  if (watcher.initialized) {
    try {
      const factory = await getFactory_async(
        event,
        event.srcAddress,
        loaderFactory,
      );

      return {
        factory,
        factories: [],
        watcher,
      };
    } catch (_error) {
      console.log("Initializing");
    }
  }

  /** If the factory isn't already configured, we've just started indexing. Prepare the contracts. */
  const factories = _initialize(event);
  const factory = factories.find(
    (f) => f.id === generateFactoryId(event, event.srcAddress),
  );

  if (!factory) {
    throw new Error("Missing factory instance at initialization");
  }

  return {
    factory,
    factories,
    watcher: {
      ...watcher,
      initialized: true,
    },
  };
}

export function initialize(
  event: Event,
  loaderWatcher: (id: string) => Watcher | undefined,
  loaderFactory: (id: string) => Factory | undefined,
) {
  const watcher = getOrCreateWatcher(event, loaderWatcher);

  if (watcher.initialized) {
    try {
      const factory = getFactory(event, event.srcAddress, loaderFactory);

      return {
        factory,
        factories: [],
        watcher,
      };
    } catch (_error) {
      console.log("Initializing");
    }
  }

  /** If the factory isn't already configured, we've just started indexing. Prepare the contracts. */
  const factories = _initialize(event);
  const factory = factories.find(
    (f) => f.id === generateFactoryId(event, event.srcAddress),
  );

  if (!factory) {
    throw new Error("Missing factory instance at initialization");
  }

  return {
    factory,
    factories,
    watcher: {
      ...watcher,
      initialized: true,
    },
  };
}

function createWatcher(event: Event): Watcher {
  const entity: Watcher = {
    id: event.chainId.toString(),
    chainId: BigInt(event.chainId),
    actionIndex: 1n,
    campaignIndex: 1n,
    initialized: false,
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
    return createWatcher(event);
  }

  return watcher;
}

export async function getOrCreateWatcher_async(
  event: Event,
  loader: (id: string) => Promise<Watcher | undefined>,
) {
  const watcher = await loader(event.chainId.toString());

  if (watcher === undefined) {
    return createWatcher(event);
  }

  return watcher;
}
