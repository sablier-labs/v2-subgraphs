import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export let zero = BigInt.fromI32(0);
export let one = BigInt.fromI32(1);
export let two = BigInt.fromI32(2);
export let d18 = BigInt.fromI32(18);

export let put = 0;
export let call = 1;

export let ADDRESS_ZERO = Bytes.fromHexString(
  "0x0000000000000000000000000000000000000000",
);
