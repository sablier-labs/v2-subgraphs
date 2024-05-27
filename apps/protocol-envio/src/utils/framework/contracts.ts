import { getContract, erc20Abi, erc20Abi_bytes32 } from "viem";
import { Address } from "../../types";
import PRBProxy from "../../../abis/PRBProxy.json";
import PRBProxyRegistry from "../../../abis/PRBProxyRegistry.json";
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

export function getPRBProxyContract(
  address: Address,
  client: ReturnType<typeof getClient>,
) {
  return getContract({
    address: address as `0x${string}`,
    abi: PRBProxy,
    client,
  });
}

export function getPRBProxyRegistryContract(
  address: Address,
  client: ReturnType<typeof getClient>,
) {
  return getContract({
    address: address as `0x${string}`,
    abi: PRBProxyRegistry,
    client,
  });
}
