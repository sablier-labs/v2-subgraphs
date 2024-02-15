import { getContract } from "viem";
import { Address } from "../../types";
import ERC20 from "../../../abis/ERC20.json";
import MerkleLL from "../../../abis/SablierV2MerkleStreamerLL.json";
import ERC20Bytes from "../../../abis/ERC20Bytes.json";
import type { getClient } from "./client";

export function getERC20Contract(
  address: Address,
  client: ReturnType<typeof getClient>,
) {
  return getContract({
    address: address as `0x${string}`,
    abi: ERC20,
    client,
  });
}

export function getERC20BytesContract(
  address: Address,
  client: ReturnType<typeof getClient>,
) {
  return getContract({
    address: address as `0x${string}`,
    abi: ERC20Bytes,
    client,
  });
}

export function getMerkleLLContract(
  address: Address,
  client: ReturnType<typeof getClient>,
) {
  return getContract({
    address: address as `0x${string}`,
    abi: MerkleLL,
    client,
  });
}
