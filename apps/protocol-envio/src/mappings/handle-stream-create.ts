import type {
  //   StreamEntity as Stream,
  ContractLockupLinearV20Contract_CreateLockupLinearStreamEvent_eventArgs as EventArgs_V20,
  ContractLockupLinearV20Contract_CreateLockupLinearStreamEvent_loaderContext as LoaderContext_V20,
  ContractLockupLinearV20Contract_CreateLockupLinearStreamEvent_handlerContext as HandlerContext_V20,
} from "../../generated/src/Types.gen";

import {
  ContractLockupLinearV20Contract_CreateLockupLinearStream_handlerAsync as HandlerAsync_V20,
  ContractLockupLinearV20Contract_CreateLockupLinearStream_loader as Loader_V20,
} from "../../generated/src/Handlers.gen";

import type { Event } from "../constants";

import { getOrCreateAsset_async, generateAssetId } from "../helpers/asset";
import { getContract_async, generateContractId } from "../helpers/contract";
import { getOrCreateWatcher_async } from "../helpers/watcher";

type Loader = {
  context: LoaderContext_V20;
  event: Event<EventArgs_V20>;
};

type Handler = {
  context: HandlerContext_V20;
  event: Event<EventArgs_V20>;
};

function loader(input: Loader) {
  const { context, event } = input;

  const assetId = generateAssetId(event, event.params.asset);
  const contractId = generateContractId(event, event.srcAddress);
  const watcherId = event.chainId.toString();

  context.Asset.load(assetId);
  context.Contract.load(contractId);
  context.Watcher.load(watcherId);
}

async function handler(input: Handler) {
  const { context, event } = input;

  const watcher = getOrCreateWatcher_async(event, context.Watcher.get);
  const asset = getOrCreateAsset_async(
    event,
    event.params.asset,
    context.Asset.get,
  );
  const contract = getContract_async(
    event,
    event.srcAddress,
    context.Contract.get,
  );
}

Loader_V20(loader);
