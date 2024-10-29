import { defineChain } from "viem";
import * as library from "viem/chains";

const tangle = defineChain({
  id: 5845,
  name: "Tangle",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.tangle.tools"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.tangle.tools" },
  },
  contracts: {
    multicall3: {
      address: "0xd595D34ed96b253E7c7a934a7624F330a8411953",
      blockCreated: 2790914,
    },
  },
});

const morph = defineChain({
  id: 2818,
  name: "Morph",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.morphl2.io"],
      webSocket: ["wss://rpc.morphl2.io:8443"],
    },
  },
  blockExplorers: {
    default: {
      name: "Morph Explorer",
      url: "https://explorer.morphl2.io",
    },
  },
  testnet: false,
  contracts: {
    multicall3: {
      address: "0x33A213b1049D5AD2eeE6e61dAe040955e60383D4",
      blockCreated: 2790914,
    },
  },
});

const custom = { morph, tangle };

export { custom, library };
