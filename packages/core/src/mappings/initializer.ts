import { Address } from "@graphprotocol/graph-ts";
import { ContractLinear, ContractPro } from "../generated/types/templates";
import { CreateLinearStream } from "../generated/types/templates/ContractLinear/SablierV2Linear";
import { getContractsLinear, getContractsPro } from "../constants";
import { createContract, getOrCreateWatcher } from "../helpers";

function createContractLinear(address: Address, alias: string): void {
  ContractLinear.create(address);
  createContract(address, alias, "Linear");
}

function createContractPro(address: Address, alias: string): void {
  ContractPro.create(address);
  createContract(address, alias, "Pro");
}

/**
 * Use the oldest linear contract as a trigger to start indexing all the other contracts.
 *
 * @param {CreateLinearStream} _event
 * @returns
 */

export function handleInitializer(_event: CreateLinearStream): void {
  let watcher = getOrCreateWatcher();
  if (watcher.isInitialized) {
    return;
  } else {
    watcher.isInitialized = true;
    watcher.save();
  }

  /** --------------- */

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
