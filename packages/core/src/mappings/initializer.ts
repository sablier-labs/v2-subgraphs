import { Address } from "@graphprotocol/graph-ts";
import { ContractLinear, ContractPro } from "../generated/types/templates";
import { CreateLinearStream } from "../generated/types/templates/ContractLinear/SablierV2Linear";
import { getContractsLinear, getContractsPro } from "../constants";
import { createContract, getStreamById } from "../helpers";
import { handleCreateLinear } from "./actions";

function createContractLinear(address: Address): void {
  ContractLinear.create(address);
  createContract(address, "Linear");
}

function createContractPro(address: Address): void {
  ContractPro.create(address);
  createContract(address, "Pro");
}

/**
 * Use the oldest linear contract as a trigger to start indexing all the other contracts.
 *
 * @param {CreateLinearStream} event
 * @returns
 */
export function handleInitializer(event: CreateLinearStream): void {
  let id = event.params.streamId.toHexString();

  if (getStreamById(id) != null) {
    return;
  }

  let linears = getContractsLinear();
  if (linears.length > 0) {
    for (let i = 0; i < linears.length; i++) {
      createContractLinear(Address.fromString(linears[i]));
    }
  }

  let pros = getContractsPro();
  if (pros.length > 0) {
    for (let i = 0; i < pros.length; i++) {
      createContractPro(Address.fromString(pros[i]));
    }
  }

  /**
   * By registering the contract on the 1st create event,
   * we need to manually handle the registration of that one stream
   */
  handleCreateLinear(event);
}
