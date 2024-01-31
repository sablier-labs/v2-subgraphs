export type Vendor = "Envio" | "TheGraph";

export const endpoint: Record<Vendor, string> = {
  Envio: "https://indexer.bigdevenergy.link/df65142/v1/graphql",
  TheGraph:
    "https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-ms-experimental",
};

export const SKIP_CLEANUP = false;
