import { Address } from "@graphprotocol/graph-ts";
import { Contract } from "../generated/types/schema";

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

  /**
   * The TransferAdmin event is for some reason omitted,
   * so don't rely on it for the comptroller.
   *
   * Instead, finish the setup at the first create event.
   */

  entity.save();
  return entity;
}
