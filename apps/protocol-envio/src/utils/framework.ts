import { createPublicClient, getContract, fallback, http } from "viem";
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
  Chain,
} from "viem/chains";
import { Address } from "../types";
import ERC20 from "../../abis/ERC20.json";
import PRBProxy from "../../abis/PRBProxy.json";
import PRBProxyRegistry from "../../abis/PRBProxyRegistry.json";
import ERC20Bytes from "../../abis/ERC20Bytes.json";

type networks = { chain: Chain; rpcEndpoints: Array<string> };

/** all rpc endpoints are public */
const supported: Array<networks> = [
  {
    chain: arbitrum,
    rpcEndpoints: [
      "https://arbitrum.llamarpc.com",
      "https://arb-pokt.nodies.app",
      "https://endpoints.omniatech.io/v1/arbitrum/one/public",
      "https://rpc.tornadoeth.cash/arbitrum",
      "https://rpc.ankr.com/arbitrum",
    ],
  },
  {
    chain: avalanche,
    rpcEndpoints: [
      "https://avalanche.public-rpc.com",
      "https://avalanche.drpc.org",
      "https://api.avax.network/ext/bc/C/rpc",
      "https://rpc.ankr.com/avalanche",
      "https://avax.meowrpc.com",
    ],
  },
  {
    chain: base,
    rpcEndpoints: [
      "https://base.llamarpc.com",
      "https://base-pokt.nodies.app",
      "https://base-mainnet.public.blastapi.io",
      "https://base.drpc.org",
      "https://base.meowrpc.com",
    ],
  },
  {
    chain: bsc,
    rpcEndpoints: [
      "https://binance.llamarpc.com",
      "https://binance.nodereal.io",
      "https://rpc.ankr.com/bsc",
      "https://rpc.tornadoeth.cash/bsc",
      "https://bsc-mainnet.public.blastapi.io",
    ],
  },
  {
    chain: gnosis,
    rpcEndpoints: [
      "https://rpc.ankr.com/gnosis",
      "https://gnosis-mainnet.public.blastapi.io",
      "https://rpc.gnosischain.com",
      "https://gnosis.drpc.org",
      "https://rpc.tornadoeth.cash/gnosis",
    ],
  },
  {
    chain: mainnet,
    rpcEndpoints: [
      "https://rpc.ankr.com/eth",
      "https://eth.llamarpc.com",
      "https://ethereum.publicnode.com",
      "https://eth-mainnet.public.blastapi.io",
      "https://rpc.tornadoeth.cash/eth",
    ],
  },
  {
    chain: optimism,
    rpcEndpoints: [
      "https://optimism.llamarpc.com",
      "https://rpc.ankr.com/optimism",
      "https://optimism.publicnode.com",
      "https://optimism.meowrpc.com",
      "https://rpc.tornadoeth.cash/optimism",
    ],
  },
  {
    chain: polygon,
    rpcEndpoints: [
      "https://polygon.llamarpc.com",
      "https://polygon-mainnet.public.blastapi.io",
      "https://polygon.drpc.org",
      "https://polygon-rpc.com",
      "https://rpc.ankr.com/polygon",
    ],
  },
  {
    chain: scroll,
    rpcEndpoints: [
      "https://rpc.ankr.com/scroll",
      "https://rpc-scroll.icecreamswap.com",
      "https://scroll-mainnet.public.blastapi.io",
      "https://rpc.scroll.io",
      "https://scroll-mainnet.chainstacklabs.com",
    ],
  },
  {
    chain: sepolia,
    rpcEndpoints: [
      "https://gateway.tenderly.co/public/sepolia",
      "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
      "https://1rpc.io/sepolia",
      "https://gateway.tenderly.co/public/sepolia",
      "https://rpc2.sepolia.org",
    ],
  },
];

const clients = supported.map((network) =>
  createPublicClient({
    batch: {
      multicall: true,
    },
    chain: network.chain,
    transport: fallback(
      // TODO bind to Infura/Alchemy for production
      network.rpcEndpoints.map((endpoint) => http(endpoint)),
      {
        rank: true, // https://viem.sh/docs/clients/transports/fallback#rank-optional
        retryCount: 5,
      },
    ),
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
