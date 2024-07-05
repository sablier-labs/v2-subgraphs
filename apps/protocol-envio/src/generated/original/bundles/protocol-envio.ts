import * as arbitrum from "../addresses/arbitrum";
import * as avalanche from "../addresses/avalanche";
import * as base from "../addresses/base";
import * as blast from "../addresses/blast";
import * as bsc from "../addresses/bsc";
import * as gnosis from "../addresses/gnosis";
import * as mainnet from "../addresses/mainnet";
import * as optimism from "../addresses/optimism";
import * as polygon from "../addresses/polygon";
import * as scroll from "../addresses/scroll";
import * as sepolia from "../addresses/sepolia";
import * as zksync from "../addresses/zksync";



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
  const list = [
    arbitrum,
    avalanche,
    base,
    blast,
    bsc,
    gnosis,
    mainnet,
    optimism,
    polygon,
    scroll,
    sepolia,
    zksync,
  ] as const;

  /** Merging the linear and dynamic arrays with a spread operator will break mustache's template engine */

  return list.map((item) => ({
    id: item.chainId,
    name: item.chain,
    start_block: item.startBlock_protocol,
    registry: item.registry?.toLowerCase() || "",
    V20: {
      dynamic: filter(item.dynamic, "V20"),
      linear: filter(item.linear, "V20"),
      tranched: [],
    },
    V21: {
      dynamic: filter(item.dynamic, "V21"),
      linear: filter(item.linear, "V21"),
      tranched: [],
    },
    V22: {
      dynamic: filter(item.dynamic, "V22"),
      linear: filter(item.linear, "V22"),
      tranched: filter(item.tranched || [], "V22"),
    },
  }));
};
