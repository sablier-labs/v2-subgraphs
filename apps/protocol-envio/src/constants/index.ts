import { chains as generator } from "./chains";

export const ADDRESS_ZERO = String(
  "0x0000000000000000000000000000000000000000",
);

export const StreamVersion = {
  V20: "V20",
  V21: "V21",
} as const;

export type StreamVersion = (typeof StreamVersion)[keyof typeof StreamVersion];

export const StreamCategory = {
  LockupLinear: "LockupLinear",
  LockupDynamic: "LockupDynamic",
} as const;

export type StreamCategory =
  (typeof StreamCategory)[keyof typeof StreamCategory];

export const ActionCategory = {
  Approval: "Approval",
  ApprovalForAll: "ApprovalForAll",
  Cancel: "Cancel",
  Create: "Create",
  Renounce: "Renounce",
  Transfer: "Transfer",
  Withdraw: "Withdraw",
} as const;

export type ActionCategory =
  (typeof ActionCategory)[keyof typeof ActionCategory];

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
