import type { Address, Batch, Batcher, Event } from "../types";

export function getOrCreateBatch(
  event: Event,
  batcher: Batcher,
  loader: (id: string) => Batch | undefined,
) {
  const id = generateBatchId(event);
  const loaded = loader(id);

  if (!loaded) {
    return createBatch(event, batcher);
  }

  return loaded;
}

export async function getOrCreateBatch_async(
  event: Event,
  batcher: Batcher,
  loader: (id: string) => Promise<Batch | undefined>,
) {
  const id = generateBatchId(event);
  const loaded = await loader(id);

  if (!loaded) {
    return createBatch(event, batcher);
  }

  return loaded;
}

export function getOrCreateBatcher(
  event: Event,
  sender: Address,
  loader: (id: string) => Batcher | undefined,
) {
  const id = generateBatcherId(event, sender);
  const loaded = loader(id);

  if (!loaded) {
    return createBatcher(event, sender);
  }

  return loaded;
}

export async function getOrCreateBatcher_async(
  event: Event,
  sender: Address,
  loader: (id: string) => Promise<Batcher | undefined>,
) {
  const id = generateBatcherId(event, sender);
  const loaded = await loader(id);

  if (!loaded) {
    return createBatcher(event, sender);
  }

  return loaded;
}

export function createBatcher(event: Event, sender: Address) {
  const entity: Batcher = {
    id: generateBatcherId(event, sender),
    address: sender.toLowerCase(),
    batchIndex: 0n,
  };

  return entity;
}

export function createBatch(event: Event, batcher: Batcher) {
  const entity: Batch = {
    id: generateBatchId(event),
    batcher: batcher.id,
    hash: event.transactionHash.toLowerCase(),
    timestamp: BigInt(event.blockTimestamp),
    label: null,
    size: 0n,
  };

  return entity;
}

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateBatchId(event: Event): string {
  return ""
    .concat(event.transactionHash.toLowerCase())
    .concat("-")
    .concat(event.chainId.toString());
}

export function generateBatcherId(event: Event, sender: Address): string {
  return ""
    .concat(sender.toLowerCase())
    .concat("-")
    .concat(event.chainId.toString());
}
