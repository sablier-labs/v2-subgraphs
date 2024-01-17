import {
  ContractEntity as Contract,
  WatcherEntity as Watcher,
} from "../src/Types.gen";
import type { Event } from "../utils";
import {
  generateContractId,
  getContract,
  getContract_async,
  initializeContracts,
} from "./contract";

export async function initialize_async(
  event: Event,
  loaderWatcher: (id: string) => Promise<Watcher | undefined>,
  loaderContract: (id: string) => Promise<Contract | undefined>,
) {
  const watcher = await getOrCreateWatcher_async(event, loaderWatcher);

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
  } catch (error) {
    /** If the contract isn't already configured, we've just started indexing. Prepare the contracts. */
    const contracts = initializeContracts(event);
    console.log;
    const contract = contracts.find(
      (c) => c.id === generateContractId(event, event.srcAddress),
    );

    if (!contract) {
      throw new Error("Missing contract instance at initialization");
    }

    return {
      contract,
      contracts,
      watcher,
    };
  }
}

export async function initialize(
  event: Event,
  loaderWatcher: (id: string) => Watcher | undefined,
  loaderContract: (id: string) => Contract | undefined,
) {
  const watcher = getOrCreateWatcher(event, loaderWatcher);
  const contract = getContract(event, event.srcAddress, loaderContract);

  if (!contract) {
    const contracts = initializeContracts(event);
    const contract = contracts.find(
      (c) => c.id === generateContractId(event, event.srcAddress),
    );

    return {
      contract,
      contracts,
      watcher,
    };
  }

  return {
    contract,
    contracts: [],
    watcher,
  };
}

function createWatcher(event: Event): Watcher {
  const entity: Watcher = {
    id: event.chainId.toString(),
    chainId: BigInt(event.chainId),
    actionIndex: 1n,
    streamIndex: 1n,
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
