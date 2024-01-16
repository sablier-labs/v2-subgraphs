import { chains as generator } from "./chains";

export const zero = BigInt(0);
export const one = BigInt(1);
export const two = BigInt(2);
export const d18 = BigInt(18);

export const ADDRESS_ZERO = String(
  "0x0000000000000000000000000000000000000000",
);

export const StreamVersion_V20 = "V20" as const;
export const StreamVersion_V21 = "V21" as const;

export type StreamVersion = typeof StreamVersion_V20 | typeof StreamVersion_V21;

export let chains = generator();

export function getContractsLinear(
  chainId: number | string,
  version: StreamVersion,
) {
  const chain = chains.find((c) => String(c.id) === String(chainId));
  if (!chain) {
    return [];
  }

  return chain[version].linear;
}

export function getContractsDynamic(
  chainId: number | string,
  version: StreamVersion,
) {
  const chain = chains.find((c) => String(c.id) === String(chainId));
  if (!chain) {
    return [];
  }

  return chain[version].dynamic;
}

export function getContractRegistry(chainId: number | string): string {
  const chain = chains.find((c) => String(c.id) === String(chainId));
  if (!chain) {
    return "";
  }

  return chain.registry;
}
