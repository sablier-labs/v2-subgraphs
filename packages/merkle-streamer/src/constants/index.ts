import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { chainId, factory, initializer } from "../generated/env";

export let zero = BigInt.fromI32(0);
export let one = BigInt.fromI32(1);
export let two = BigInt.fromI32(2);
export let d18 = BigInt.fromI32(18);

export let put = 0;
export let call = 1;

export let ADDRESS_ZERO = Bytes.fromHexString(
  "0x0000000000000000000000000000000000000000",
);

export function getContractInitializer(): string {
  return initializer.toLowerCase();
}

export function getContractsFactory(): string[][] {
  if (factory.length === 0) {
    return [];
  }
  return factory.map<string[]>((item) => [
    item[0].toString().toLowerCase(),
    item[1].toString().toLowerCase(),
  ]);
}

export function getChainId(): BigInt {
  return BigInt.fromI32(chainId);
}
