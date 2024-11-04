import * as experimental from "../addresses/experimental";
import definitions from "./definitions";

const available = (v: { flow: unknown[] }) => {
  return v.flow.length > 0;
};

const filter = (list: string[][], version: string) => {
  return (
    list
      .filter((entry) => entry[2] === version)
      .map((entry) => ({
        address: entry[0]?.toLowerCase() || "",
        alias: entry[1],
        version: entry[2],
      })) || []
  );
};

/**
 * Bind a viem chain definition to a sablier indexer configuration.
 * ↪ 🚨 Chains without valid viem definitions will not be taken into account.
 */

export const chains = () => {
  const list = [
    [experimental, definitions.sepolia],
  ] as const;

  /** Merging the arrays with a spread operator will break mustache's template engine */

  return list.map(([item, definition]) => {
    const V10 = {
      flow: filter(item.flow, "V10"),
      available: false,
    };

    V10.available = available(V10);

    return {
      definition,
      id: item.chainId,
      name: item.chain,
      start_block: item.startBlock_merkle,
      V10,
    };
  }).filter((item) => item.definition);
};
