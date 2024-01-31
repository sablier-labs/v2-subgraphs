export type Vendor = "Envio" | "TheGraph";

export const endpoint: Record<Vendor, string> = {
  Envio: "https://indexer.bigdevenergy.link/89e6765/v1/graphql", // "http://localhost:8080/v1/graphql",
  TheGraph:
    "https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-ms-experimental",
};

export const SKIP_CLEANUP = false;
