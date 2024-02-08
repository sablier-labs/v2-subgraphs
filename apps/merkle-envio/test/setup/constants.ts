export type Vendor = "Envio" | "TheGraph";

export const endpoint: Record<Vendor, string> = {
  Envio: "http://localhost:8080/v1/graphql",
  TheGraph:
    "https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-ms-experimental",
};

export const SKIP_CLEANUP = false;
