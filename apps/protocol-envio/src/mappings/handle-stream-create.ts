import type {
  ContractLockupLinearV20Contract_CreateLockupLinearStreamEvent_eventArgs as EventLinearArgs_V20,
  ContractLockupLinearV20Contract_CreateLockupLinearStreamEvent_loaderContext as LoaderLinearContext_V20,
  ContractLockupLinearV20Contract_CreateLockupLinearStreamEvent_handlerContextAsync as HandlerLinearContext_V20,
} from "../../generated/src/Types.gen";

import {
  ContractLockupLinearV20Contract_CreateLockupLinearStream_handlerAsync as HandlerLinearAsync_V20,
  ContractLockupLinearV20Contract_CreateLockupLinearStream_loader as LoaderLinear_V20,
} from "../../generated/src/Handlers.gen";

import type { Event } from "../utils";

import { getOrCreateAsset_async, generateAssetId } from "../helpers/asset";
import { generateContractId } from "../helpers/contract";
import { createLinearStream } from "../helpers/stream";
import { initialize_async } from "../helpers/watcher";
import {
  generateBatchId,
  generateBatcherId,
  getOrCreateBatch_async,
  getOrCreateBatcher_async,
} from "../helpers/batch";

type LoaderLinear = {
  context: LoaderLinearContext_V20;
  event: Event<EventLinearArgs_V20>;
};

type HandlerLinear = {
  context: HandlerLinearContext_V20;
  event: Event<EventLinearArgs_V20>;
};

function loaderLinear(input: LoaderLinear) {
  const { context, event } = input;

  const assetId = generateAssetId(event, event.params.asset);
  const batchId = generateBatchId(event);
  const batcherId = generateBatcherId(event, event.params.sender);
  const contractId = generateContractId(event, event.srcAddress);
  const watcherId = event.chainId.toString();

  context.Asset.load(assetId);
  context.Batch.load(batchId, {});
  context.Batcher.load(batcherId);
  context.Contract.load(contractId);
  context.Watcher.load(watcherId);
}

async function handlerLinear(input: HandlerLinear) {
  const { context, event } = input;

  /** ------- Fetch -------- */
  /** Upon stream creation we'll also make sure the contract entities have been pre-configured. */

  const { watcher, contract, contracts } = await initialize_async(
    event,
    context.Watcher.get,
    context.Contract.get,
  );

  const asset = await getOrCreateAsset_async(
    event,
    event.params.asset,
    context.Asset.get,
  );
  const batcher = await getOrCreateBatcher_async(
    event,
    event.params.sender,
    context.Batcher.get,
  );
  const batch = await getOrCreateBatch_async(event, batcher, context.Batch.get);

  /** ------- Process -------- */

  const entities = await createLinearStream(
    event,
    asset,
    batch,
    batcher,
    contract,
    watcher,
  );

  /** ------- Update -------- */

  await context.Asset.set(asset);
  if (contracts.length) {
    for (let i = 0; i < contracts.length; i++) {
      if (contracts[i].id === contract.id) {
        await context.Contract.set(contract);
      }
      await context.Contract.set(contracts[i]);
    }
  }

  await context.Batch.set(entities.batch);
  await context.Batcher.set(entities.batcher);
  await context.Stream.set(entities.stream);
  await context.Watcher.set(entities.watcher);
}

LoaderLinear_V20(loaderLinear);
HandlerLinearAsync_V20(handlerLinear);
