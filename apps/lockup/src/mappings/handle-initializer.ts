import { Address } from "@graphprotocol/graph-ts";
import {
  ContractLockupDynamic as DynamicTemplate,
  ContractLockupLinear as LinearTemplate,
  ContractLockupTranched as TranchedTemplate,
  ContractLockup as LockupTemplate
} from "../generated/types/templates";
import {
  CreateLockupLinearStream as EventCreateLinear_V20,
  CreateLockupLinearStream1 as EventCreateLinear_V21,
  CreateLockupLinearStream2 as EventCreateLinear_V22,
  TransferAdmin as EventTransferAdmin,
} from "../generated/types/templates/ContractLockupLinear/SablierLockupLinear";
import {
  CreateLockupLinearStream as EventCreateLinear_V23,
} from "../generated/types/templates/ContractLockup/SablierLockup";
import {
  getContractsDynamic,
  getContractsLinear,
  getContractsTranched,
  getContractsLockup
} from "../constants";
import { createContract, getOrCreateWatcher } from "../helpers";

function createContractLinear(
  address: Address,
  alias: string,
  version: string,
): void {
  LinearTemplate.create(address);
  createContract(address, alias, version, "LockupLinear");
}

function createContractDynamic(
  address: Address,
  alias: string,
  version: string,
): void {
  DynamicTemplate.create(address);
  createContract(address, alias, version, "LockupDynamic");
}

function createContractTranched(
  address: Address,
  alias: string,
  version: string,
): void {
  TranchedTemplate.create(address);
  createContract(address, alias, version, "LockupTranched");
}

function createContractLockup(
  address: Address,
  alias: string,
  version: string,
): void {
  LockupTemplate.create(address);
  createContract(address, alias, version, "Lockup");
}

/**
 * Use the oldest linear contract as a trigger to start indexing all the other contracts.
 */

export function handleInitializer(): void {
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
        linearList[i][2],
      );
    }
  }

  let dynamicList = getContractsDynamic();
  if (dynamicList.length > 0) {
    for (let i = 0; i < dynamicList.length; i++) {
      createContractDynamic(
        Address.fromString(dynamicList[i][0]),
        dynamicList[i][1],
        dynamicList[i][2],
      );
    }
  }

  let tranchedList = getContractsTranched();
  if (tranchedList.length > 0) {
    for (let i = 0; i < tranchedList.length; i++) {
      createContractTranched(
        Address.fromString(tranchedList[i][0]),
        tranchedList[i][1],
        tranchedList[i][2],
      );
    }
  }

  let lockupList = getContractsLockup();
  if (lockupList.length > 0) {
    for (let i = 0; i < lockupList.length; i++) {
      createContractLockup(
        Address.fromString(lockupList[i][0]),
        lockupList[i][1],
        lockupList[i][2],
      );
    }
  }
}

/** Genesis event from the Lockup Linear contract */
export function handleInitializer_Admin(_event: EventTransferAdmin): void {
  handleInitializer();
}
/** Backup genesis event from the Lockup Linear contract */
export function handleInitializer_Create_V20(
  _event: EventCreateLinear_V20,
): void {
  handleInitializer();
}
export function handleInitializer_Create_V21(
  _event: EventCreateLinear_V21,
): void {
  handleInitializer();
}

export function handleInitializer_Create_V22(
  _event: EventCreateLinear_V22,
): void {
  handleInitializer();
}

export function handleInitializer_Create_V23(
  _event: EventCreateLinear_V23,
): void {
  handleInitializer();
}
