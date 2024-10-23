import { Address } from "@graphprotocol/graph-ts";
import { Contract } from "../generated/types/schema";
import { SablierLockupDynamic as SablierLockupDynamicContract } from "../generated/types/templates/ContractLockupDynamic/SablierLockupDynamic";
import { SablierLockupLinear as SablierLockupLinearContract } from "../generated/types/templates/ContractLockupLinear/SablierLockupLinear";

export function getContractByAddress(address: Address): Contract | null {
  return Contract.load(generateContractId(address));
}

export function createContract(
  address: Address,
  alias: string,
  version: string,
  category: string,
): Contract {
  let id = generateContractId(address);
  let entity = getContractByAddress(address);

  if (entity == null) {
    entity = new Contract(id);
  }

  entity.alias = alias;
  entity.address = address;
  entity.category = category;
  entity.version = version;

  /**
   * For contracts that aren't on-chain at this time, the admin will be picked up by the TransferAdmin event.
   * For initializers, the following code will resolve the admin address as the TransferAdmin event may not be picked up.
   */

  if (category === "LockupLinear") {
    let contract = SablierLockupLinearContract.bind(address);
    let admin = contract.try_admin();
    if (!admin.reverted) {
      entity.admin = admin.value;
    }
  } else if (category === "LockupDynamic") {
    let contract = SablierLockupDynamicContract.bind(address);
    let admin = contract.try_admin();
    if (!admin.reverted) {
      entity.admin = admin.value;
    }
  }

  entity.save();
  return entity;
}

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateContractId(address: Address): string {
  return "".concat(address.toHexString());
}
