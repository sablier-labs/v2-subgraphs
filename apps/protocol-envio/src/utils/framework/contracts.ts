import { erc20Abi, erc20Abi_bytes32 } from "viem";
import { Address } from "../../types";
import PRBProxy from "../../../abis/PRBProxy.json";
import PRBProxyRegistry from "../../../abis/PRBProxyRegistry.json";

export function getERC20Contract(address: Address) {
  return { address: address as `0x${string}`, abi: erc20Abi };
}

export function getERC20BytesContract(address: Address) {
  return {
    address: address as `0x${string}`,
    abi: erc20Abi_bytes32,
  };
}

export function getPRBProxyContract(address: Address) {
  return {
    address: address as `0x${string}`,
    abi: PRBProxy,
  };
}

export function getPRBProxyRegistryContract(address: Address) {
  return {
    address: address as `0x${string}`,
    abi: PRBProxyRegistry,
  };
}
