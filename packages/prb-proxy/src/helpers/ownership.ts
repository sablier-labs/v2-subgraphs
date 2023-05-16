import { ethereum } from "@graphprotocol/graph-ts";
import { Ownership } from "../generated/types/schema";

export function generateOwnershipId(
  owner: string,
  proxy: string,
  event: ethereum.Event,
): string {
  return ""
    .concat(owner)
    .concat("-")
    .concat(proxy)
    .concat("-")
    .concat(event.block.timestamp.toHexString());
}

export function getOrCreateOwnership(
  owner: string,
  proxy: string,
  event: ethereum.Event,
): Ownership {
  let id = generateOwnershipId(owner, proxy, event);
  let entity = Ownership.load(id);

  if (entity == null) {
    entity = new Ownership(id);
    entity.hash = event.transaction.hash;
    entity.timestamp = event.block.timestamp;
    entity.proxy = proxy;
    entity.owner = owner;

    entity.save();
  }

  return entity;
}
