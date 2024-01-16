import { Address } from "@graphprotocol/graph-ts";
import { CreateMerkleStreamerLL as EventCreateLinear } from "../generated/types/ContractInitializer/SablierV2MerkleStreamerFactory";
import { ContractMerkleStreamerFactory as FactoryTemplate } from "../generated/types/templates";
import { getContractsFactory } from "../constants";
import { createFactory, getOrCreateWatcher } from "../helpers";

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

  let factories = getContractsFactory();
  if (factories.length > 0) {
    for (let i = 0; i < factories.length; i++) {
      const address = Address.fromString(factories[i][0]);
      const alias = factories[i][1];

      FactoryTemplate.create(address);
      createFactory(address, alias);
    }
  }
}
