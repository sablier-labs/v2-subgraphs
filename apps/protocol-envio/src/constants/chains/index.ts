import * as arbitrum from "./arbitrum";
import * as avalanche from "./avalanche";
import * as base from "./base";
import * as bsc from "./bsc";
import * as gnosis from "./gnosis";
import * as mainnet from "./mainnet";
import * as optimism from "./optimism";
import * as polygon from "./polygon";
import * as scroll from "./scroll";
import * as sepolia from "./sepolia";

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
  const _list = [
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
  ] as const;

  const list = [arbitrum];

  /** Merging the linear and dynamic arrays with a spread operator will break mustache's template engine */

  return list.map((item) => ({
    id: item.chainId,
    name: item.chain,
    start_block: item.startBlock,
    registry: item.registry?.toLowerCase() || "",
    V20: {
      dynamic: filter(item.dynamic, "V20"),
      linear: filter(item.linear, "V20"),
    },
    V21: {
      dynamic: filter(item.dynamic, "V21"),
      linear: filter(item.linear, "V21"),
    },
  }));
};
