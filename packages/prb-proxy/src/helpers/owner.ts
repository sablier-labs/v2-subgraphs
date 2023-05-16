import { Address } from "@graphprotocol/graph-ts";
import { Owner } from "../generated/types/schema";

export function getOwnerById(id: string): Owner | null {
  return Owner.load(id);
}

export function getOrCreateOwner(id: string): Owner {
  let entity = Owner.load(id);

  if (entity == null) {
    entity = new Owner(id);
    entity.address = Address.fromHexString(id);
    entity.save();
  }

  return entity;
}
