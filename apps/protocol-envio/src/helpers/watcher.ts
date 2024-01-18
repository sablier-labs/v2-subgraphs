import type { Contract, Event, Watcher } from "../types";
import {
  _initialize,
  generateContractId,
  getContract,
  getContract_async,
} from "./contract";

export async function initialize_async(
  event: Event,
  loaderWatcher: (id: string) => Promise<Watcher | undefined>,
  loaderContract: (id: string) => Promise<Contract | undefined>,
) {
  const watcher = await getOrCreateWatcher_async(event, loaderWatcher);

  if (watcher.initialized) {
    try {
      const contract = await getContract_async(
        event,
        event.srcAddress,
        loaderContract,
      );

      return {
        contract,
        contracts: [],
        watcher,
      };
    } catch (_error) {
      console.log("Initializing");
    }
  }

  /** If the contract isn't already configured, we've just started indexing. Prepare the contracts. */
  const contracts = _initialize(event);
  const contract = contracts.find(
    (c) => c.id === generateContractId(event, event.srcAddress),
  );

  if (!contract) {
    throw new Error("Missing contract instance at initialization");
  }

  return {
    contract,
    contracts,
    watcher: {
      ...watcher,
      initialized: true,
    },
  };
}

export function initialize(
  event: Event,
  loaderWatcher: (id: string) => Watcher | undefined,
  loaderContract: (id: string) => Contract | undefined,
) {
  const watcher = getOrCreateWatcher(event, loaderWatcher);

  if (watcher.initialized) {
    try {
      const contract = getContract(event, event.srcAddress, loaderContract);

      return {
        contract,
        contracts: [],
        watcher,
      };
    } catch (_error) {
      console.log("Initializing");
    }
  }

  /** If the contract isn't already configured, we've just started indexing. Prepare the contracts. */
  const contracts = _initialize(event);
  const contract = contracts.find(
    (c) => c.id === generateContractId(event, event.srcAddress),
  );

  if (!contract) {
    throw new Error("Missing contract instance at initialization");
  }

  return {
    contract,
    contracts,
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
    streamIndex: 1n,
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
