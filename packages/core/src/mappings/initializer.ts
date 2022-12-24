import { getLinearContracts } from "../constants";
import { Linear as LinearTemplate } from "../generated/types/templates";
import { CreateLinearStream } from "../generated/types/templates/Linear/SablierV2Linear";
import { getStreamById } from "../helpers";
import { handleCreateLinear } from "./actions";
import { Address } from "@graphprotocol/graph-ts";

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

  let linears = getLinearContracts();
  if (linears.length > 0) {
    for (let i = 0; i < linears.length; i++) {
      let id = linears[i];
      LinearTemplate.create(Address.fromString(id));
    }
  }

  //   let periphery = getPeripheryContracts();
  //   if (periphery.length > 0) {
  //     for (let i = 0; i < periphery.length; i++) {
  //         let id = periphery[i];
  //         PeripheryContract.create(Address.fromString(id));
  //       }
  //   }

  //   let pros = getProContracts();
  //   if (pros.length > 0) {
  //     for (let i = 0; i < pros.length; i++) {
  //         let id = pros[i];
  //         ProContract.create(Address.fromString(id));
  //       }
  //   }

  handleCreateLinear(event);
}
