import { Address } from "@graphprotocol/graph-ts";
import {
  ContractLockupDynamic as DynamicTemplate,
  ContractLockupLinear as LinearTemplate,
} from "../generated/types/templates";
import { CreateLockupLinearStream as EventCreateLinear } from "../generated/types/templates/ContractLockupLinear/SablierV2LockupLinear";
import { getContractsDynamic, getContractsLinear } from "../constants";
import { createContract, getOrCreateWatcher } from "../helpers";

function createContractLinear(address: Address, alias: string): void {
  LinearTemplate.create(address);
  createContract(address, alias, "LockupLinear");
}

function createContractDynamic(address: Address, alias: string): void {
  DynamicTemplate.create(address);
  createContract(address, alias, "LockupDynamic");
}

/**
 * Use the oldest linear contract as a trigger to start indexing all the other contracts.
 */

export function handleInitializer(_event: EventCreateLinear): void {
  let watcher = getOrCreateWatcher();
  if (watcher.initialized) {
    return;
  } else {
    watcher.initialized = true;
    watcher.save();
  }

  let linearList = getContractsLinear();
  if (linearList.length > 0) {
    for (let i = 0; i < linearList.length; i++) {
      createContractLinear(
        Address.fromString(linearList[i][0]),
        linearList[i][1],
      );
    }
  }

  let dynamicList = getContractsDynamic();
  if (dynamicList.length > 0) {
    for (let i = 0; i < dynamicList.length; i++) {
      createContractDynamic(
        Address.fromString(dynamicList[i][0]),
        dynamicList[i][1],
      );
    }
  }
}
