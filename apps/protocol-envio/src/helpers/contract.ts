import { ContractEntity as Contract } from "../../generated/src/Types.gen";

import type { Event, StreamCategory, StreamVersion } from "../constants";
import {
  chains,
  StreamCategory_LockupLinear,
  StreamVersion_V20,
  StreamVersion_V21,
} from "../constants";

export function generateContractId(event: Event, address: string): string {
  return "".concat(address).concat("-").concat(event.chainId.toString());
}

export function createContract(
  event: Event,
  address: string,
  alias: string,
  version: StreamVersion,
  category: StreamCategory,
): Contract {
  const entity: Contract = {
    id: generateContractId(event, address),
    address: address.toLowerCase(),
    chainId: BigInt(event.chainId),
    admin: null,
    alias,
    category,
    version,
  };

  return entity;
}

export function initializeContracts(event: Event) {
  const versions = [StreamVersion_V20, StreamVersion_V21];

  chains.forEach((chain) => {
    versions.forEach((version) => {
      chain[version].linear.forEach((linear) => {
        createContract(
          event,
          linear.address,
          linear.alias,
          version,
          StreamCategory_LockupLinear,
        );
      }),
        chain[version].dynamic.forEach((dynamic) => {
          createContract(
            event,
            dynamic.address,
            dynamic.alias,
            version,
            StreamCategory_LockupLinear,
          );
        });
    });
  });
}

export function getContract(
  event: Event,
  address: string,
  loader: (id: string) => Contract | undefined,
) {
  const id = generateContractId(event, address);
  const loaded = loader(id);

  if (!loaded) {
    throw new Error("Missing contract instance");
  }

  return loaded;
}

export async function getContract_async(
  event: Event,
  address: string,
  loader: (id: string) => Contract | undefined,
) {
  const id = generateContractId(event, address);
  const loaded = await loader(id);

  if (!loaded) {
    throw new Error("Missing contract instance");
  }
  return loaded;
}
