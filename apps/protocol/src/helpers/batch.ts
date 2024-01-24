import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { Batch, Batcher } from "../generated/types/schema";
import { getChainId, one, zero } from "../constants";

export function getOrCreateBatcher(sender: Address): Batcher {
  let id = generateBatcherId(sender);
  let entity = Batcher.load(id);

  if (entity == null) {
    entity = new Batcher(id);
    entity.address = sender;
    entity.batchIndex = zero;
  }

  return entity;
}

export function getOrCreateBatch(
  event: ethereum.Event,
  sender: Address,
): Batch {
  let id = generateBatchId(event);
  let entity = Batch.load(id);
  let batcher = getOrCreateBatcher(sender);

  if (entity == null) {
    entity = new Batch(id);
    entity.hash = event.transaction.hash;
    entity.timestamp = event.block.timestamp;
    entity.batcher = batcher.id;
    entity.size = one;
  } else {
    entity.size = entity.size.plus(one);
    if (BigInt.compare(entity.size, one) == 1 && entity.label == null) {
      let label = batcher.batchIndex.plus(one).toString();
      entity.label = label;
      batcher.batchIndex = batcher.batchIndex.plus(one);
      batcher.save();
    }
  }

  entity.save();

  return entity;
}

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateBatchId(event: ethereum.Event): string {
  return ""
    .concat(event.transaction.hash.toHexString())
    .concat("-")
    .concat(getChainId().toString());
}

export function generateBatcherId(sender: Address): string {
  return ""
    .concat(sender.toHexString())
    .concat("-")
    .concat(getChainId().toString());
}
