import { createPublicClient, getContract, http } from "viem";
import {
  arbitrum,
  base,
  bsc,
  gnosis,
  mainnet,
  optimism,
  polygon,
  scroll,
  sepolia,
} from "viem/chains";
import { Address } from "../types";
import ERC20 from "../../abis/ERC20.json";
import ERC20Bytes from "../../abis/ERC20Bytes.json";
import MerkleLL from "../../abis/SablierV2MerkleStreamerLL.json";

const supported = [
  arbitrum,
  base,
  bsc,
  gnosis,
  mainnet,
  optimism,
  polygon,
  scroll,
  sepolia,
];

const clients = supported.map((chain) =>
  createPublicClient({
    batch: {
      multicall: true,
    },
    chain,
    transport: http(), // TODO bind to Infura/Alchemy and use viem's fallback-transport
  }),
);

function getClient(chainId: number | string | bigint) {
  const client = clients.find(
    (c) => c.chain.id.toString() === chainId.toString(),
  );

  if (!client) {
    throw new Error(`Client missing from configuration for chain: ${chainId}`);
  }

  return client;
}

function getERC20Contract(
  address: Address,
  client: ReturnType<typeof getClient>,
) {
  return getContract({
    address: address as `0x${string}`,
    abi: ERC20,
    publicClient: client,
  });
}

function getERC20BytesContract(
  address: Address,
  client: ReturnType<typeof getClient>,
) {
  return getContract({
    address: address as `0x${string}`,
    abi: ERC20Bytes,
    publicClient: client,
  });
}

function getMerkleLLContract(
  address: Address,
  client: ReturnType<typeof getClient>,
) {
  return getContract({
    address: address as `0x${string}`,
    abi: MerkleLL,
    publicClient: client,
  });
}

export const framework = {
  getClient,
  getERC20Contract,
  getERC20BytesContract,
  getMerkleLLContract,
};
