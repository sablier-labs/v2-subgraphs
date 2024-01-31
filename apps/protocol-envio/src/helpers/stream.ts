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
  CreateDynamicArgs,
  CreateLinearArgs,
} from "../types";

import { StreamCategory, configuration } from "../constants";
import { createSegments } from "./segments";
import { bindProxy } from "./proxy";

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
    subgraphId: BigInt(watcher.streamIndex),
    hash: event.transactionHash.toLowerCase(),
    timestamp: BigInt(event.blockTimestamp),
    chainId: BigInt(event.chainId),

    /** --------------- */

    proxied: false,
    canceled: false,
    transferable: true,

    renounceAction: undefined,
    canceledAction: undefined,
    cliffAmount: undefined,
    withdrawnAmount: 0n,

    canceledTime: undefined,
    cliffTime: undefined,
    renounceTime: undefined,

    /** --------------- */
    batch: batch.id,
    position: BigInt(batch.size),
  } satisfies Entity;

  /** --------------- */

  watcher = {
    ...watcher,
    streamIndex: BigInt(watcher.streamIndex) + 1n,
  };

  /** --------------- */

  const post_batch = (() => {
    if (batch.size === 0n) {
      return {
        batch: {
          ...batch,
          size: BigInt(batch.size) + 1n,
        },
        batcher: batcher,
      };
    }
    /**
     * If the batch already has content,
     * assign it a label and bump the batcher's index
     */

    const label = (BigInt(batcher.batchIndex) + 1n).toString();

    return {
      batch: {
        ...batch,
        label,
        size: BigInt(batch.size) + 1n,
      },
      batcher: {
        ...batcher,
        batchIndex: BigInt(batcher.batchIndex) + 1n,
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

export async function createDynamicStream(
  event: Event<CreateDynamicArgs>,
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
    cliffAmount: undefined,
    cliffTime: undefined,

    depositAmount: BigInt(event.params.amounts[0]),
    intactAmount: BigInt(event.params.amounts[0]),
    protocolFeeAmount: BigInt(event.params.amounts[1]),
    brokerFeeAmount: BigInt(event.params.amounts[2]),

    startTime: BigInt(event.params.range[0]),
    endTime: BigInt(event.params.range[1]),
    cancelable: event.params.cancelable,
    duration: BigInt(event.params.range[1]) - BigInt(event.params.range[0]),
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
  const partProxy = await bindProxy(entity);

  /** --------------- */
  const partTransferable = {
    transferable:
      "transferable" in event.params
        ? event.params.transferable
        : entity.transferable,
  };

  /** --------------- */
  const stream: Stream = {
    ...entity,
    ...partAsset,
    ...partProxy,
    ...partTransferable,
  };

  return {
    batch,
    batcher,
    stream,
    segments,
    watcher,
  };
}

export async function createLinearStream(
  event: Event<CreateLinearArgs>,
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
    duration: BigInt(event.params.range[2]) - BigInt(event.params.range[0]),
  } satisfies Entity;

  /** --------------- */
  const partCliff = (() => {
    const deposit = BigInt(entity.depositAmount);
    const cliffTime = BigInt(event.params.range[1]);
    const cliff = BigInt(cliffTime) - BigInt(entity.startTime);

    if (cliff !== 0n) {
      return {
        cliff: true,
        cliffAmount: BigInt(deposit * cliff) / BigInt(entity.duration),
        cliffTime,
      };
    }

    return {
      cliff: false,
      cliffAmount: undefined,
      cliffTime: undefined,
    };
  })() satisfies Entity;

  /** --------------- */
  /** Asset: managed by the event handler (upstream) */
  const partAsset = { asset: asset.id } satisfies Entity;

  /** --------------- */
  /** Batch: managed by the base creator method (downstream) */

  /** --------------- */
  const partProxy = await bindProxy(entity);

  /** --------------- */
  const partTransferable = {
    transferable:
      "transferable" in event.params
        ? event.params.transferable
        : entity.transferable,
  };

  /** --------------- */
  const stream: Stream = {
    ...entity,
    ...partAsset,
    ...partCliff,
    ...partProxy,
    ...partTransferable,
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

  if (!stream) {
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

  if (!stream) {
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
