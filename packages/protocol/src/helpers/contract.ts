import { Address } from "@graphprotocol/graph-ts";
import { Contract } from "../generated/types/schema";
import { SablierV2LockupDynamic as SablierV2LockupDynamicContract } from "../generated/types/templates/ContractLockupDynamic/SablierV2LockupDynamic";
import { SablierV2LockupLinear as SablierV2LockupLinearContract } from "../generated/types/templates/ContractLockupLinear/SablierV2LockupLinear";

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

  /**
   * For contracts that aren't on-chain at this time, the admin will be picked up by the TransferAdmin event.
   * For initializers, the following code will resolve the admin address as the TransferAdmin event may not be picked up.
   */

  if (category === "LockupLinear") {
    let contract = SablierV2LockupLinearContract.bind(address);
    let admin = contract.try_admin();
    if (!admin.reverted) {
      entity.admin = admin.value;
    }
  } else if (category === "LockupDynamic") {
    let contract = SablierV2LockupDynamicContract.bind(address);
    let admin = contract.try_admin();
    if (!admin.reverted) {
      entity.admin = admin.value;
    }
  }

  entity.save();
  return entity;
}
