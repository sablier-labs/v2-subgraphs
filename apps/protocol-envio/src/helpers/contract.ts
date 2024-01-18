import type { Address, Contract, Event } from "../types";
import { chains, StreamCategory, StreamVersion } from "../constants";

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

export function generateContractIdFromEvent(event: Event) {
  return ""
    .concat(event.srcAddress.toLowerCase())
    .concat("-")
    .concat(event.chainId.toString());
}

export function _initialize(event: Event): Contract[] {
  const versions = [StreamVersion.V20, StreamVersion.V21];

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
              StreamCategory.LockupLinear,
            ),
          );

          const LD = chain[version].dynamic.map((dynamic) =>
            createContract(
              event,
              dynamic.address,
              dynamic.alias,
              version,
              StreamCategory.LockupDynamic,
            ),
          );

          return [LL, LD].flat();
        })
        .flat();
    })
    .flat();
}
