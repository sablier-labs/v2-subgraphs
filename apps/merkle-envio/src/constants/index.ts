import { chains as generator } from "../../../../packages/constants/src/bundles/merkle-envio";

export const ADDRESS_ZERO = String(
  "0x0000000000000000000000000000000000000000",
);

export const StreamVersion = {
  V20: "V20",
  V21: "V21",
  V22: "V22",
} as const;

export const StreamCategory = {
  LockupLinear: "LockupLinear",
  LockupDynamic: "LockupDynamic",
  LockupTranched: "LockupTranched",
} as const;

export const ActionCategory = {
  Claim: "Claim",
  Clawback: "Clawback",
  Create: "Create",
  TransferAdmin: "TransferAdmin",
} as const;

export const CacheCategory = {
  Token: "token",
} as const;

export const chains = generator();

export function configuration(chainId: number | string | bigint) {
  const configuration = chains.find((c) => String(c.id) === chainId.toString());

  if (!configuration) {
    throw new Error("Missing chain configuration");
  }

  return {
    ...configuration,
    contracts: [...configuration.V21.factory, ...configuration.V22.factory],
  };
}

export type ActionCategory =
  (typeof ActionCategory)[keyof typeof ActionCategory];

export type CacheCategory = (typeof CacheCategory)[keyof typeof CacheCategory];

export type StreamCategory =
  (typeof StreamCategory)[keyof typeof StreamCategory];

export type StreamVersion = (typeof StreamVersion)[keyof typeof StreamVersion];
