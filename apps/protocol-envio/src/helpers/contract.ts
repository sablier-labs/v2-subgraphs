import { ContractEntity as Contract } from "../../generated/src/Types.gen";

import type { StreamCategory, StreamVersion } from "../constants";
import type { Address, Event } from "../utils";
import {
  chains,
  StreamCategory_LockupLinear,
  StreamVersion_V20,
  StreamVersion_V21,
} from "../constants";

export function getContract(
  event: Event,
  address: Address,
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
  address: Address,
  loader: (id: string) => Promise<Contract | undefined>,
) {
  const id = generateContractId(event, address);
  const loaded = await loader(id);

  if (!loaded) {
    throw new Error("Missing contract instance");
  }
  return loaded;
}

export function createContract(
  event: Event,
  address: Address,
  alias: string,
  version: StreamVersion,
  category: StreamCategory,
) {
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

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateContractId(event: Event, address: Address) {
  return ""
    .concat(address.toLowerCase())
    .concat("-")
    .concat(event.chainId.toString());
}

export function initializeContracts(event: Event): Contract[] {
  const versions = [StreamVersion_V20, StreamVersion_V21];

  return chains
    .map((chain) => {
      return versions
        .map((version) => {
          const LL = chain[version].linear.map((linear) =>
            createContract(
              event,
              linear.address,
              linear.alias,
              version,
              StreamCategory_LockupLinear,
            ),
          );

          const LD = chain[version].dynamic.map((dynamic) =>
            createContract(
              event,
              dynamic.address,
              dynamic.alias,
              version,
              StreamCategory_LockupLinear,
            ),
          );

          return [LL, LD].flat();
        })
        .flat();
    })
    .flat();
}
