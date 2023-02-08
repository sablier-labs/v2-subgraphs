import { Address } from "@graphprotocol/graph-ts";
import {
  ContractLockupLinear as ContractLinear,
  ContractLockupPro as ContractPro,
} from "../generated/types/templates";
import { CreateLockupLinearStream as EventCreateLinear } from "../generated/types/templates/ContractLockupLinear/SablierV2LockupLinear";
import {
  getContractsComptroller,
  getContractsLinear,
  getContractsPro,
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

function createContractPro(address: Address, alias: string): void {
  ContractPro.create(address);
  createContract(address, alias, "LockupPro");
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
  if (watcher.isInitialized) {
    return;
  } else {
    watcher.isInitialized = true;
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

  let pros = getContractsPro();
  if (pros.length > 0) {
    for (let i = 0; i < pros.length; i++) {
      createContractPro(Address.fromString(pros[i][0]), pros[i][1]);
    }
  }
}
