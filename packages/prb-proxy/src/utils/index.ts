import { one, zero } from "../constants";
import { BigInt } from "@graphprotocol/graph-ts";

export function convertExponentToBigInt(decimals: BigInt): BigInt {
  let base = BigInt.fromI32(1);
  for (let i = zero; i.lt(decimals); i = i.plus(one)) {
    base = base.times(BigInt.fromI32(10));
  }
  return base;
}

export function convertStringToPaddedZero(source: String): String {
  let result = source;
  while (result.length !== 66) {
    result = result.concat("0");
  }

  return result;
}
