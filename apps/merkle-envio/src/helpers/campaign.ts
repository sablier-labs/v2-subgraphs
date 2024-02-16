import type {
  Address,
  Asset,
  Campaign,
  Event,
  Factory,
  Mutable,
  Watcher,
  CreateLinearArgs,
} from "../types";

import { StreamCategory, StreamVersion } from "../constants";

type Entity = Partial<Mutable<Campaign>>;

function createCampaign(
  event: Event,
  address: Address,
  entities: {
    factory: Factory;
    watcher: Watcher;
  },
) {
  let { factory, watcher } = entities;
  const id = generateCampaignId(event, address);

  /** --------------- */

  const entity = {
    id,
    address: address.toLowerCase(),
    subgraphId: BigInt(watcher.campaignIndex),
    hash: event.transactionHash.toLowerCase(),
    timestamp: BigInt(event.blockTimestamp),
    chainId: BigInt(event.chainId),

    /** --------------- */

    clawbackAction_id: undefined,
    clawbackTime: undefined,

    claimedAmount: 0n,
    claimedCount: 0n,

    factory_id: factory.id,
  } satisfies Entity;

  /** --------------- */

  watcher = {
    ...watcher,
    campaignIndex: BigInt(watcher.campaignIndex) + 1n,
  };

  return {
    entity,
    watcher,
  };
}

export async function createLinearCampaign(
  event: Event<CreateLinearArgs>,
  entities: {
    asset: Asset;
    factory: Factory;
    watcher: Watcher;
  },
) {
  let { asset, factory, watcher } = entities;

  const { entity: partial, ...post_create } = createCampaign(
    event,
    event.params.merkleStreamer,
    {
      factory,
      watcher,
    },
  );

  watcher = post_create.watcher;

  /** --------------- */

  let entity = {
    ...partial,
    expires: BigInt(event.params.expiration) !== 0n,
    expiration: BigInt(event.params.expiration),
    /** --------------- */
    admin: event.params.admin.toLowerCase(),
    lockup: event.params.lockupLinear.toLowerCase(),
    /** --------------- */
    root: event.params.merkleRoot,
    ipfsCID: event.params.ipfsCID,
    aggregateAmount: BigInt(event.params.aggregateAmount),
    totalRecipients: BigInt(event.params.recipientsCount),
    /** --------------- */
    category: StreamCategory.LockupLinear,
    streamCliff: BigInt(event.params.streamDurations[0]) !== 0n,
    streamCliffDuration: BigInt(event.params.streamDurations[0]),
    streamTotalDuration: BigInt(event.params.streamDurations[1]),
    streamCancelable: event.params.cancelable,
    streamTransferable: event.params.transferable,

    version: StreamVersion.V21,
  } satisfies Entity;

  /** --------------- */
  /** Asset: managed by the event handler (upstream) */
  const partAsset = { asset_id: asset.id } satisfies Entity;

  /** --------------- */
  const campaign: Campaign = {
    ...entity,
    ...partAsset,
  };

  return {
    campaign,
    watcher,
  };
}

export async function getCampaign_async(
  event: Event,
  loader: (id: string) => Promise<Campaign | undefined>,
) {
  const id = generateCampaignId(event, event.srcAddress);
  const loaded = await loader(id);

  if (loaded === undefined) {
    throw new Error("Missing campaign instance");
  }

  return loaded;
}

export function getCampaign(
  event: Event,
  loader: (id: string) => Campaign | undefined,
) {
  const id = generateCampaignId(event, event.srcAddress);
  const loaded = loader(id);

  if (loaded === undefined) {
    throw new Error("Missing campaign instance");
  }

  return loaded;
}

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateCampaignId(event: Event, address: Address) {
  let id = ""
    .concat(address.toLowerCase())
    .concat("-")
    .concat(event.chainId.toString());

  return id;
}
