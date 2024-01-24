import { Address } from "@graphprotocol/graph-ts";
import { Factory } from "../generated/types/schema";
import { getChainId } from "../constants";

export function getFactoryByAddress(address: Address): Factory | null {
  const id = generateFactoryId(address);
  return Factory.load(id);
}

export function createFactory(address: Address, alias: string): Factory {
  let id = generateFactoryId(address);
  let entity = getFactoryByAddress(address);
  if (entity == null) {
    entity = new Factory(id);
  }

  entity.alias = alias;
  entity.address = address;

  entity.save();
  return entity;
}

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateFactoryId(address: Address) {
  return ""
    .concat(address.toHexString())
    .concat("-")
    .concat(getChainId().toString());
}
