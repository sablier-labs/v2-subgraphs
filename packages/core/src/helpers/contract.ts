import { Address } from "@graphprotocol/graph-ts";
import { Contract } from "../generated/types/schema";
import { getOrCreateComptrollerFromContract } from "./comptroller";

export function getContractById(id: string): Contract | null {
  return Contract.load(id);
}

export function createContract(
  address: Address,
  alias: string,
  category: string,
): Contract {
  let id = address.toHexString();
  let entity = getContractById(id);
  if (entity == null) {
    entity = new Contract(id);
  }

  entity.admin = Address.zero();
  entity.alias = alias;
  entity.address = address;
  entity.category = category;

  let comptroller = getOrCreateComptrollerFromContract(address, category);
  if (comptroller != null) {
    entity.comptroller = comptroller.id;
  }

  entity.save();
  return entity;
}
