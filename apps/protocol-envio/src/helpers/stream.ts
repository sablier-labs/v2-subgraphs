import {
  AssetEntity as Asset,
  BatchEntity as Batch,
  BatcherEntity as Batcher,
  ContractEntity as Contract,
  StreamEntity as Stream,
  WatcherEntity as Watcher,
  ContractLockupLinearV20Contract_CreateLockupLinearStreamEvent_eventArgs as EventLinearArgs_V20,
} from "../../generated/src/Types.gen";

import type { Address, Event, Mutable } from "../utils";
import { StreamCategory_LockupLinear, configuration } from "../constants";

type Entity = Partial<Mutable<Stream>>;

function createStream(
  event: Event,
  batch_: Batch,
  batcher_: Batcher,
  contract: Contract,
  tokenId: bigint,
  watcher_: Watcher,
) {
  let id = generateStreamId(event, contract.address, tokenId);
  let alias = generateStreamAlias(event, contract.address, tokenId);

  /** --------------- */

  const entity = {
    id,
    tokenId,
    alias,
    contract: contract.id,
    version: contract.version,
    subgraphId: watcher_.streamIndex,
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
    batch: batch_.id,
    position: batch_.size - 1n,
  } satisfies Entity;

  /** --------------- */

  const watcher: Watcher = {
    ...watcher_,
    streamIndex: watcher_.streamIndex + 1n,
  };

  /** --------------- */

  const { batch, batcher } = ((): { batch: Batch; batcher: Batcher } => {
    if (batch_.size === 0n) {
      return {
        batch: {
          ...batch_,
          size: batch_.size + 1n,
        },
        batcher: batcher_,
      };
    }
    /**
     * If the batch already has content,
     * assign it a label and bump the batcher's index
     */

    const label = (batcher_.batchIndex + 1n).toString();

    return {
      batch: {
        ...batch_,
        label,
        size: batch_.size + 1n,
      },
      batcher: {
        ...batcher_,
        batchIndex: batcher_.batchIndex + 1n,
      },
    };
  })();

  return {
    entity,
    batch,
    batcher,
    watcher,
  };
}

export function createLinearStream(
  event: Event<EventLinearArgs_V20>,
  asset: Asset,
  batch_: Batch,
  batcher_: Batcher,
  contract: Contract,
  watcher_: Watcher,
) {
  const {
    entity: partial,
    batch,
    batcher,
    watcher,
  } = createStream(
    event,
    batch_,
    batcher_,
    contract,
    event.params.streamId,
    watcher_,
  );

  /** --------------- */

  let entity = {
    ...partial,
    category: StreamCategory_LockupLinear,
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

  /** --------------- */

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

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateStreamId(
  event: Event,
  address: Address,
  tokenId: bigint,
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
