import type { Mutable, Campaign } from "../types";

import { CacheCategory, StreamVersion } from "../constants";
import { Cache, framework } from "../utils";

type Entity = Partial<Mutable<Campaign>>;

export async function bindRoot({
  address,
  chainId,
  version,
}: Pick<Campaign, "address" | "chainId" | "version">) {
  if (version === StreamVersion.V21) {
    const cache = Cache.init(CacheCategory.Root, chainId);
    const entry = cache.read(address);

    if (entry && entry.hash?.length > 0) {
      return {
        root: entry.hash,
      } satisfies Entity;
    }

    const client = framework.getClient(chainId);

    try {
      const campaign = framework.getMerkleLLContract(address, client);
      const [root_] = (await Promise.all([
        campaign.read.MERKLE_ROOT(),
      ])) as string[];

      if (root_ && root_.length) {
        const root = root_.toLowerCase();

        cache.add({ [address.toLowerCase()]: { hash: root } });

        return {
          root,
        } satisfies Entity;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    root: "",
  } satisfies Entity;
}
