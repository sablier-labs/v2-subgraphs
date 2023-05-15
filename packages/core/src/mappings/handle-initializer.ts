import { Address } from "@graphprotocol/graph-ts";
import {
  ContractLockupDynamic as ContractDynamic,
  ContractLockupLinear as ContractLinear,
} from "../generated/types/templates";
import { CreateLockupLinearStream as EventCreateLinear } from "../generated/types/templates/ContractLockupLinear/SablierV2LockupLinear";
import {
  getContractsComptroller,
  getContractsDynamic,
  getContractsLinear,
} from "../constants";
import {
  createContract,
  getOrCreateComptroller,
  getOrCreateWatcher,
} from "../helpers";

function createContractLinear(address: Address, alias: string): void {
  ContractLinear.create(address);
  createContract(address, alias, "LockupLinear");
}

function createContractDynamic(address: Address, alias: string): void {
  ContractDynamic.create(address);
  createContract(address, alias, "LockupDynamic");
}

function createContractComptroller(address: Address): void {
  getOrCreateComptroller(address);
}

/**
 * Use the oldest linear contract as a trigger to start indexing all the other contracts.
 *
 * @param {EventCreateLinear} _event
 * @returns
 */

export function handleInitializer(_event: EventCreateLinear): void {
  let watcher = getOrCreateWatcher();
  if (watcher.initialized) {
    return;
  } else {
    watcher.initialized = true;
    watcher.save();
  }

  /** --------------- */

  let comptrollers = getContractsComptroller();
  if (comptrollers.length > 0) {
    for (let i = 0; i < comptrollers.length; i++) {
      createContractComptroller(Address.fromString(comptrollers[i][0]));
    }
  }

  let linears = getContractsLinear();
  if (linears.length > 0) {
    for (let i = 0; i < linears.length; i++) {
      createContractLinear(Address.fromString(linears[i][0]), linears[i][1]);
    }
  }

  let dynamics = getContractsDynamic();
  if (dynamics.length > 0) {
    for (let i = 0; i < dynamics.length; i++) {
      createContractDynamic(Address.fromString(dynamics[i][0]), dynamics[i][1]);
    }
  }
}
