import { CacheCategory } from "../constants";
import type { Address, Event, Asset } from "../types";
import { Cache, framework } from "../utils";

export function getAsset(
  event: Event,
  address: Address,
  loader: (id: string) => Asset | undefined,
) {
  const id = generateAssetId(event, address);
  const loaded = loader(id);

  if (!loaded) {
    throw new Error("Missing asset instance");
  }

  return loaded;
}

export async function getAsset_async(
  event: Event,
  address: Address,
  loader: (id: string) => Promise<Asset | undefined>,
) {
  const id = generateAssetId(event, address.toLowerCase());
  const loaded = await loader(id);

  if (!loaded) {
    throw new Error("Missing asset instance");
  }

  return loaded;
}

export async function getOrCreateAsset_async(
  event: Event,
  address: Address,
  loader: (id: string) => Promise<Asset | undefined>,
) {
  const id = generateAssetId(event, address);
  const loaded = await loader(id);

  if (!loaded) {
    return createAsset(event, address.toLowerCase());
  }

  return loaded;
}

async function createAsset(event: Event, address: Address) {
  const { decimals, name, symbol } = await details(address, event.chainId);

  const entity: Asset = {
    id: generateAssetId(event, address),
    address: address.toLowerCase(),
    decimals: BigInt(decimals),
    chainId: BigInt(event.chainId),
    name,
    symbol,
  };

  return entity;
}

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateAssetId(event: Event, address: Address) {
  return "".concat(address).concat("-").concat(event.chainId.toString());
}

async function details(address: Address, chainId: number) {
  const cache = Cache.init(CacheCategory.Token, chainId);
  const token = cache.read(address.toLowerCase());

  if (token) {
    return {
      address,
      decimals: BigInt(token.decimals),
      name: token.name,
      symbol: token.symbol,
    };
  }

  const client = framework.getClient(chainId);

  try {
    const erc20 = framework.getERC20Contract(address, client);
    const [decimals, name, symbol] = await Promise.all([
      erc20.read.decimals(),
      erc20.read.name(),
      erc20.read.symbol(),
    ]);

    const entry = {
      decimals: decimals?.toString() || "",
      name: name?.toString() || "",
      symbol: symbol?.toString() || "",
    } as const;

    cache.add({ [address.toLowerCase()]: entry });

    return {
      decimals: BigInt(entry.decimals || 0),
      name: entry.name,
      symbol: entry.symbol,
    };
  } catch (_error) {
    /** Some tokens store their parameters as bytes not strings */
    try {
      const erc20Bytes = framework.getERC20Contract(address, client);
      const [decimals, name, symbol] = await Promise.all([
        erc20Bytes.read.decimals(),
        erc20Bytes.read.name(),
        erc20Bytes.read.symbol(),
      ]);

      const entry = {
        decimals: decimals?.toString() || "",
        name: name?.toString() || "",
        symbol: symbol?.toString() || "",
      } as const;

      cache.add({ [address.toLowerCase()]: entry });

      return {
        decimals: BigInt(entry.decimals || 0),
        name: entry.name,
        symbol: entry.symbol,
      };
    } catch (__error) {
      console.error(_error, __error);
      return {
        decimals: 18,
        symbol: address,
        name: address,
      };
    }
  }
}
