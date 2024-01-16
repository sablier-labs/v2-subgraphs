import { chains as generator } from "./chains";
import * as macros from "./macros";

export const zero = BigInt(0);
export const one = BigInt(1);
export const two = BigInt(2);
export const d18 = BigInt(18);

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
  return configuration;
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

export * from "./macros";
export { macros };
