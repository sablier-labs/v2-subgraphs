import { getContract, erc20Abi, erc20Abi_bytes32 } from "viem";
import { Address } from "../../types";
import type { getClient } from "./client";

export function getERC20Contract(
  address: Address,
  client: ReturnType<typeof getClient>,
) {
  return getContract({
    address: address as `0x${string}`,
    abi: erc20Abi,
    client,
  });
}

export function getERC20BytesContract(
  address: Address,
  client: ReturnType<typeof getClient>,
) {
  return getContract({
    address: address as `0x${string}`,
    abi: erc20Abi_bytes32,
    client,
  });
}
