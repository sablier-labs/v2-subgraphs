import type {
  Address,
  Asset,
  Batch,
  Batcher,
  Contract,
  Event,
  Mutable,
  Stream,
  Watcher,
  EventCreateDynamicArgs_V20 as DynamicArgs_V20,
  EventCreateLinearArgs_V20 as LinearArgs_V20,
} from "../types";

import { StreamCategory, configuration } from "../constants";
import { createSegments } from "./segments";

type Entity = Partial<Mutable<Stream>>;

function createStream(
  event: Event,
  tokenId: bigint,
  entities: {
    batch: Batch;
    batcher: Batcher;
    contract: Contract;
    watcher: Watcher;
  },
) {
  let { batch, batcher, contract, watcher } = entities;

  const id = generateStreamId(event, contract.address, tokenId);
  const alias = generateStreamAlias(event, contract.address, tokenId);

  /** --------------- */

  const entity = {
    id,
    tokenId,
    alias,
    contract: contract.id,
    version: contract.version,
    subgraphId: watcher.streamIndex,
    hash: event.transactionHash,
    timestamp: BigInt(event.blockTimestamp),
    chainId: BigInt(event.chainId),

    /** --------------- */

    proxied: false,
    canceled: false,
    transferable: true,

    renounceAction: null,
    canceledAction: null,
    cliffAmount: 0n,
    withdrawnAmount: 0n,

    canceledTime: 0n,
    cliffTime: 0n,
    renounceTime: 0n,

    /** --------------- */
    batch: batch.id,
    position: batch.size,
  } satisfies Entity;

  /** --------------- */

  watcher = {
    ...watcher,
    streamIndex: watcher.streamIndex + 1n,
  };

  /** --------------- */

  const post_batch = (() => {
    if (batch.size === 0n) {
      return {
        batch: {
          ...batch,
          size: batch.size + 1n,
        },
        batcher: batcher,
      };
    }
    /**
     * If the batch already has content,
     * assign it a label and bump the batcher's index
     */

    const label = (batcher.batchIndex + 1n).toString();

    return {
      batch: {
        ...batch,
        label,
        size: batch.size + 1n,
      },
      batcher: {
        ...batcher,
        batchIndex: batcher.batchIndex + 1n,
      },
    };
  })();

  batch = post_batch.batch;
  batcher = post_batch.batcher;

  return {
    entity,
    batch,
    batcher,
    watcher,
  };
}

export function createDynamicStream(
  event: Event<DynamicArgs_V20>,
  entities: {
    asset: Asset;
    batch: Batch;
    batcher: Batcher;
    contract: Contract;
    watcher: Watcher;
  },
) {
  let { asset, batch, batcher, contract, watcher } = entities;

  const { entity: partial, ...post_create } = createStream(
    event,
    event.params.streamId,
    {
      batch,
      batcher,
      contract,
      watcher,
    },
  );

  batch = post_create.batch;
  batcher = post_create.batcher;
  watcher = post_create.watcher;

  /** --------------- */

  let entity = {
    ...partial,
    category: StreamCategory.LockupDynamic,
    funder: event.params.funder.toLowerCase(),
    sender: event.params.sender.toLowerCase(),
    recipient: event.params.recipient.toLowerCase(),
    parties: [
      event.params.sender.toLowerCase(),
      event.params.recipient.toLowerCase(),
    ],

    cliff: false,
    cliffAmount: 0n,
    cliffTime: 0n,

    depositAmount: BigInt(event.params.amounts[0]),
    intactAmount: BigInt(event.params.amounts[0]),
    protocolFeeAmount: BigInt(event.params.amounts[1]),
    brokerFeeAmount: BigInt(event.params.amounts[2]),

    startTime: BigInt(event.params.range[0]),
    endTime: BigInt(event.params.range[1]),
    cancelable: event.params.cancelable,
    duration: BigInt(event.params.range[1] - event.params.range[1]),
  } satisfies Entity;

  /** --------------- */
  /** Asset: managed by the event handler (upstream) */
  const partAsset = { asset: asset.id } satisfies Entity;

  /** --------------- */
  /** Batch: managed by the base creator method (downstream) */

  /** --------------- */
  /** Segments: created, have to be saved */
  const segments = createSegments(event, entity);

  /** --------------- */
  const partProxy = {
    proxender: "", // TODO
    proxied: false,
  } satisfies Entity;

  /** --------------- */

  const stream: Stream = {
    ...entity,
    ...partAsset,
    ...partProxy,
  };

  return {
    batch,
    batcher,
    stream,
    segments,
    watcher,
  };
}

export function createLinearStream(
  event: Event<LinearArgs_V20>,
  entities: {
    asset: Asset;
    batch: Batch;
    batcher: Batcher;
    contract: Contract;
    watcher: Watcher;
  },
) {
  let { asset, batch, batcher, contract, watcher } = entities;

  const { entity: partial, ...post_create } = createStream(
    event,
    event.params.streamId,
    {
      batch,
      batcher,
      contract,
      watcher,
    },
  );

  batch = post_create.batch;
  batcher = post_create.batcher;
  watcher = post_create.watcher;

  /** --------------- */

  let entity = {
    ...partial,
    category: StreamCategory.LockupLinear,
    funder: event.params.funder.toLowerCase(),
    sender: event.params.sender.toLowerCase(),
    recipient: event.params.recipient.toLowerCase(),
    parties: [
      event.params.sender.toLowerCase(),
      event.params.recipient.toLowerCase(),
    ],

    depositAmount: BigInt(event.params.amounts[0]),
    intactAmount: BigInt(event.params.amounts[0]),
    protocolFeeAmount: BigInt(event.params.amounts[1]),
    brokerFeeAmount: BigInt(event.params.amounts[2]),

    startTime: BigInt(event.params.range[0]),
    endTime: BigInt(event.params.range[2]),
    cancelable: event.params.cancelable,
    duration: BigInt(event.params.range[2] - event.params.range[1]),
  } satisfies Entity;

  /** --------------- */
  const partCliff = (() => {
    const deposit = BigInt(entity.depositAmount);
    const cliff = BigInt(BigInt(event.params.range[1]) - entity.startTime);

    if (cliff !== 0n) {
      return {
        cliff: true,
        cliffAmount: (deposit * cliff) / entity.duration,
        cliffTime: event.params.range[1],
      };
    }

    return {
      cliff: false,
      cliffAmount: 0n,
      cliffTime: 0n,
    };
  })() satisfies Entity;

  /** --------------- */
  /** Asset: managed by the event handler (upstream) */
  const partAsset = { asset: asset.id } satisfies Entity;

  /** --------------- */
  /** Batch: managed by the base creator method (downstream) */

  /** --------------- */
  const partProxy = {
    proxender: "", // TODO
    proxied: false,
  } satisfies Entity;

  const stream: Stream = {
    ...entity,
    ...partAsset,
    ...partCliff,
    ...partProxy,
  };

  return {
    batch,
    batcher,
    stream,
    watcher,
  };
}

export async function getStream_async(
  event: Event,
  tokenId: bigint | string,
  loader: (id: string) => Stream | undefined,
) {
  const id = generateStreamId(event, event.srcAddress, tokenId);
  const stream = await loader(id);

  if (stream === undefined) {
    throw new Error("Missing stream instance");
  }

  return stream;
}

export function getStream(
  event: Event,
  tokenId: bigint | string,
  loader: (id: string) => Stream | undefined,
) {
  const id = generateStreamId(event, event.srcAddress, tokenId);
  const stream = loader(id);

  if (stream === undefined) {
    throw new Error("Missing stream instance");
  }

  return stream;
}

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateStreamId(
  event: Event,
  address: Address,
  tokenId: bigint | string,
) {
  let id = ""
    .concat(address.toLowerCase())
    .concat("-")
    .concat(event.chainId.toString())
    .concat("-")
    .concat(tokenId.toString());

  return id;
}

export function generateStreamAlias(
  event: Event,
  address: Address,
  tokenId: bigint,
) {
  const chain = configuration(event.chainId);
  const contract = chain.contracts.find(
    (c) => c.address === address.toLowerCase(),
  );

  if (!contract) {
    throw new Error("Missing or mismatched contract in configuration");
  }

  let id = ""
    .concat(contract.alias.toLowerCase())
    .concat("-")
    .concat(event.chainId.toString())
    .concat("-")
    .concat(tokenId.toString());

  return id;
}
