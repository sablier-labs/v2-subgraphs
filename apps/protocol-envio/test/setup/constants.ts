export type Vendor = "Envio" | "TheGraph";

const CHAIN_SEPOLIA_ID = 11155111;

export const endpoints: Record<number, Record<Vendor, string>> = {
  [CHAIN_SEPOLIA_ID]: {
    Envio: "http://localhost:8080/v1/graphql",
    TheGraph:
      "https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-experimental",
  },
} as const;

export const chainId = CHAIN_SEPOLIA_ID;
export const endpoint = endpoints[chainId];

export const SKIP_CLEANUP = false;
