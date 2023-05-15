import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  chainId,
  comptroller,
  dynamic,
  initializer,
  linear,
} from "../generated/env";

export let zero = BigInt.fromI32(0);
export let one = BigInt.fromI32(1);
export let two = BigInt.fromI32(2);
export let d18 = BigInt.fromI32(18);

export let put = 0;
export let call = 1;

export let ADDRESS_ZERO = Bytes.fromHexString(
  "0x0000000000000000000000000000000000000000",
);

export function getInitializerContract(): string {
  return initializer.toLowerCase();
}

export function getContractsComptroller(): string[][] {
  return comptroller.map<string[]>((item) => [
    item[0].toString().toLowerCase(),
    item[1].toString().toLowerCase(),
  ]);
}

export function getContractsLinear(): string[][] {
  if (linear.length === 0) {
    return [];
  }
  return linear.map<string[]>((item) => [
    item[0].toString().toLowerCase(),
    item[1].toString().toLowerCase(),
  ]);
}

export function getContractsDynamic(): string[][] {
  return dynamic.map<string[]>((item) => [
    item[0].toString().toLowerCase(),
    item[1].toString().toLowerCase(),
  ]);
}

export function getChainId(): BigInt {
  return BigInt.fromI32(chainId);
}
