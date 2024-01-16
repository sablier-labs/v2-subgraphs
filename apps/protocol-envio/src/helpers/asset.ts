import { AssetEntity as Asset } from "../../generated/src/Types.gen";

import type { Event } from "../constants";

export function generateAssetId(event: Event, address: string): string {
  return "".concat(address).concat("-").concat(event.chainId.toString());
}

async function createAsset(event: Event, address: string) {
  const { decimals, name, symbol } = await fetchAssetDetails(
    address,
    event.chainId,
  );

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

// TODO
async function fetchAssetDetails(_address: string, _chainId: number) {
  return {
    decimals: 18,
    name: "TODO Token",
    symbol: "TODO",
  };
}

export function getOrCreateAsset(
  event: Event,
  address: string,
  loader: (id: string) => Asset | undefined,
) {
  const id = generateAssetId(event, address);
  const loaded = loader(id);

  if (!loaded) {
    return createAsset(event, address);
  }

  return loaded;
}

export async function getOrCreateAsset_async(
  event: Event,
  address: string,
  loader: (id: string) => Asset | undefined,
) {
  const id = generateAssetId(event, address);
  const loaded = await loader(id);

  if (!loaded) {
    return createAsset(event, address);
  }

  return loaded;
}
