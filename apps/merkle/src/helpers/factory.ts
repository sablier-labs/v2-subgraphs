import { Address } from "@graphprotocol/graph-ts";
import { Factory } from "../generated/types/schema";

export function getFactoryById(id: string): Factory | null {
  return Factory.load(id);
}

export function createFactory(address: Address, alias: string): Factory {
  let id = address.toHexString();
  let entity = getFactoryById(id);
  if (entity == null) {
    entity = new Factory(id);
  }

  entity.alias = alias;
  entity.address = address;

  entity.save();
  return entity;
}
