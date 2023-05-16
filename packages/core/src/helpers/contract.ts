import { Address } from "@graphprotocol/graph-ts";
import { Contract } from "../generated/types/schema";
import { SablierV2LockupDynamic as LockupDynamicContract } from "../generated/types/templates/ContractLockupDynamic/SablierV2LockupDynamic";
import { SablierV2LockupLinear as LockupLinearContract } from "../generated/types/templates/ContractLockupLinear/SablierV2LockupLinear";
import { getOrCreateComptroller } from "./comptroller";

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

  entity.alias = alias;
  entity.address = address;
  entity.category = category;

  if (category === "LockupLinear") {
    let instance = LockupLinearContract.bind(address);
    let comptrollerId = instance.comptroller();
    let comptroller = getOrCreateComptroller(comptrollerId);

    entity.comptroller = comptroller.id;
  } else if (category === "LockupPro") {
    let instance = LockupDynamicContract.bind(address);
    let comptrollerId = instance.comptroller();
    let comptroller = getOrCreateComptroller(comptrollerId);

    entity.comptroller = comptroller.id;
  }

  entity.save();
  return entity;
}
