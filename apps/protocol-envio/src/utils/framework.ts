import { createPublicClient, getContract, http } from "viem";
import {
  arbitrum,
  avalanche,
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
import PRBProxy from "../../abis/PRBProxy.json";
import PRBProxyRegistry from "../../abis/PRBProxyRegistry.json";
import ERC20Bytes from "../../abis/ERC20Bytes.json";

const supported = [
  arbitrum,
  avalanche,
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
    transport: http(),
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

function getPRBProxyContract(
  address: Address,
  client: ReturnType<typeof getClient>,
) {
  return getContract({
    address: address as `0x${string}`,
    abi: PRBProxy,
    publicClient: client,
  });
}

function getPRBProxyRegistryContract(
  address: Address,
  client: ReturnType<typeof getClient>,
) {
  return getContract({
    address: address as `0x${string}`,
    abi: PRBProxyRegistry,
    publicClient: client,
  });
}

export const framework = {
  getClient,
  getERC20Contract,
  getERC20BytesContract,
  getPRBProxyContract,
  getPRBProxyRegistryContract,
};
