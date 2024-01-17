import { AssetEntity as Asset } from "../../generated/src/Types.gen";

import type { Address, Event } from "../utils";

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

export async function getOrCreateAsset_async(
  event: Event,
  address: Address,
  loader: (id: string) => Promise<Asset | undefined>,
) {
  const id = generateAssetId(event, address);
  const loaded = await loader(id);

  if (!loaded) {
    return createAsset(event, address);
  }

  return loaded;
}

async function createAsset(event: Event, address: Address) {
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

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateAssetId(event: Event, address: Address) {
  return "".concat(address).concat("-").concat(event.chainId.toString());
}

// TODO
async function fetchAssetDetails(_address: Address, _chainId: number) {
  return {
    decimals: 18,
    name: "TODO Token",
    symbol: "TODO",
  };
}
