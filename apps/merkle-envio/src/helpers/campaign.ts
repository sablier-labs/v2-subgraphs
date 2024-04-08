import type {
  Address,
  Asset,
  Campaign,
  Event,
  Factory,
  Mutable,
  Watcher,
  CreateLinearArgs_V22,
  CreateLinearArgs_V21,
  CreateTranchedArgs_V22,
} from "../types";

import { StreamCategory, StreamVersion } from "../constants";
import { createTranches } from "./tranches";

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

    name: "",

    clawbackAction_id: undefined,
    clawbackTime: undefined,

    claimedAmount: 0n,
    claimedCount: 0n,

    streamCliff: false,
    streamCliffDuration: 0n,

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

export async function createLinearCampaign_V21(
  event: Event<CreateLinearArgs_V21>,
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

export async function createLinearCampaign_V22(
  event: Event<CreateLinearArgs_V22>,
  entities: {
    asset: Asset;
    factory: Factory;
    watcher: Watcher;
  },
) {
  let { asset, factory, watcher } = entities;

  const { entity: partial, ...post_create } = createCampaign(
    event,
    event.params.merkleLockupLL,
    {
      factory,
      watcher,
    },
  );

  watcher = post_create.watcher;

  /** --------------- */

  const params = {
    initialAdmin: event.params.baseParams[0],
    asset: event.params.baseParams[1],
    ipfsCID: event.params.baseParams[2],
    name: event.params.baseParams[3],
    merkleRoot: event.params.baseParams[4],
    expiration: event.params.baseParams[5],
    cancelable: event.params.baseParams[6],
    transferable: event.params.baseParams[7],
  } as const;

  let entity = {
    ...partial,
    expires: BigInt(params.expiration) !== 0n,
    expiration: BigInt(params.expiration),
    /** --------------- */
    admin: params.initialAdmin.toLowerCase(),
    lockup: event.params.lockupLinear.toLowerCase(),
    /** --------------- */
    name: params.name,
    root: params.merkleRoot,
    ipfsCID: params.ipfsCID,
    aggregateAmount: BigInt(event.params.aggregateAmount),
    totalRecipients: BigInt(event.params.recipientsCount),
    /** --------------- */
    category: StreamCategory.LockupLinear,
    streamCliff: BigInt(event.params.streamDurations[0]) !== 0n,
    streamCliffDuration: BigInt(event.params.streamDurations[0]),
    streamTotalDuration: BigInt(event.params.streamDurations[1]),
    streamCancelable: params.cancelable,
    streamTransferable: params.transferable,

    version: StreamVersion.V22,
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

export async function createTranchedCampaign_V22(
  event: Event<CreateTranchedArgs_V22>,
  entities: {
    asset: Asset;
    factory: Factory;
    watcher: Watcher;
  },
) {
  let { asset, factory, watcher } = entities;

  const { entity: partial, ...post_create } = createCampaign(
    event,
    event.params.merkleLockupLT,
    {
      factory,
      watcher,
    },
  );

  watcher = post_create.watcher;

  /** --------------- */

  const params = {
    initialAdmin: event.params.baseParams[0],
    asset: event.params.baseParams[1],
    ipfsCID: event.params.baseParams[2],
    name: event.params.baseParams[3],
    merkleRoot: event.params.baseParams[4],
    expiration: event.params.baseParams[5],
    cancelable: event.params.baseParams[6],
    transferable: event.params.baseParams[7],
  } as const;

  let entity = {
    ...partial,
    expires: BigInt(params.expiration) !== 0n,
    expiration: BigInt(params.expiration),
    /** --------------- */
    admin: params.initialAdmin.toLowerCase(),
    lockup: event.params.lockupTranched.toLowerCase(),
    /** --------------- */
    name: params.name,
    root: params.merkleRoot,
    ipfsCID: params.ipfsCID,
    aggregateAmount: BigInt(event.params.aggregateAmount),
    totalRecipients: BigInt(event.params.recipientsCount),
    /** --------------- */
    category: StreamCategory.LockupTranched,
    streamTotalDuration: BigInt(event.params.totalDuration),
    streamCancelable: params.cancelable,
    streamTransferable: params.transferable,

    version: StreamVersion.V22,
  } satisfies Entity;

  /** --------------- */
  /** Asset: managed by the event handler (upstream) */
  const partAsset = { asset_id: asset.id } satisfies Entity;

  /** --------------- */
  /** Tranches: created, have to be saved */
  const tranches = createTranches(event, entity);

  /** --------------- */
  const campaign: Campaign = {
    ...entity,
    ...partAsset,
  };

  return {
    campaign,
    tranches,
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
