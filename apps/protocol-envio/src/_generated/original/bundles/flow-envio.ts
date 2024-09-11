import * as experimental from "../addresses/experimental";

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

export const chains = () => {
  const list = [experimental] as const;

  /** Merging the linear and dynamic arrays with a spread operator will break mustache's template engine */

  return list.map((item) => {
    const V22 = {
      flow: filter(item.flow, "V22"),
      available: false,
    };

    V22.available = available(V22);

    return {
      id: item.chainId,
      name: item.chain,
      start_block: item.startBlock_merkle,
      V22,
    };
  });
};
