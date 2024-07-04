import { chains as generator_merkle } from "../../../../packages/constants/src/bundles/merkle-envio";
import { chains as generator_protocol } from "../../../../packages/constants/src/bundles/protocol-envio";

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

export const chains = generator_merkle();

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

export function isWhitelistedShape(
  chainId: number | string | bigint,
  address: string,
) {
  const configuration = generator_protocol().find(
    (c) => String(c.id) === chainId.toString(),
  );
  if (!configuration) {
    throw new Error("Missing chain configuration");
  }

  const contracts = [configuration?.V20, configuration?.V21, configuration?.V22]
    .map((item) => [
      ...(item?.linear || []),
      ...(item?.dynamic || []),
      ...(item?.tranched || []),
    ])
    .flat();

  const addresses = contracts.map((c) => c.address.toLowerCase());

  return addresses.includes(address.toLowerCase());
}

export type ActionCategory =
  (typeof ActionCategory)[keyof typeof ActionCategory];

export type CacheCategory = (typeof CacheCategory)[keyof typeof CacheCategory];

export type StreamCategory =
  (typeof StreamCategory)[keyof typeof StreamCategory];

export type StreamVersion = (typeof StreamVersion)[keyof typeof StreamVersion];
