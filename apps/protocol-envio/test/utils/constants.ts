export type Vendor = "Envio" | "TheGraph";

export const endpoint: Record<Vendor, string> = {
  Envio: "https://indexer.bigdevenergy.link/be2052e/v1/graphql",
  TheGraph:
    "https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-experimental",
};

export const SKIP_CLEANUP = false;
