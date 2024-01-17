import { chains as generator } from "./chains";

export const ADDRESS_ZERO = String(
  "0x0000000000000000000000000000000000000000",
);

export const StreamVersion_V20 = "V20" as const;
export const StreamVersion_V21 = "V21" as const;
export type StreamCategory =
  | typeof StreamCategory_LockupLinear
  | typeof StreamCategory_LockupDynamic;

export const StreamCategory_LockupLinear = "LockupLinear" as const;
export const StreamCategory_LockupDynamic = "LockupDynamic" as const;
export type StreamVersion = typeof StreamVersion_V20 | typeof StreamVersion_V21;

export const chains = generator();

export function configuration(chainId: number | string) {
  const configuration = chains.find((c) => String(c.id) === String(chainId));

  if (!configuration) {
    throw new Error("Missing chain configuration");
  }

  return {
    ...configuration,
    contracts: [
      ...configuration.V20.linear,
      ...configuration.V20.dynamic,
      ...configuration.V21.linear,
      ...configuration.V21.dynamic,
    ],
  };
}

export function getContractsLinear(
  chainId: number | string,
  version: StreamVersion,
) {
  return configuration(chainId)[version].linear;
}

export function getContractsDynamic(
  chainId: number | string,
  version: StreamVersion,
) {
  return configuration(chainId)[version].dynamic;
}

export function getContractRegistry(chainId: number | string): string {
  return configuration(chainId).registry;
}
