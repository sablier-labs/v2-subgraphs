import {
  MerkleLockupFactoryV21Contract_CreateMerkleStreamerLL_handlerAsync as HandlerLinearAsync_V21,
  MerkleLockupFactoryV21Contract_CreateMerkleStreamerLL_loader as LoaderLinear_V21,
  MerkleLockupFactoryV22Contract_CreateMerkleLL_handlerAsync as HandlerLinearAsync_V22,
  MerkleLockupFactoryV22Contract_CreateMerkleLL_loader as LoaderLinear_V22,
  MerkleLockupFactoryV22Contract_CreateMerkleLT_handlerAsync as HandlerTranchedAsync_V22,
  MerkleLockupFactoryV22Contract_CreateMerkleLT_loader as LoaderTranched_V22,
} from "../../generated/src/Handlers.gen";

import type {
  CreateLinearLoader_V21,
  CreateLinearHandler_V21,
  CreateLinearLoader_V22,
  CreateLinearHandler_V22,
  CreateTranchedLoader_V22,
  CreateTranchedHandler_V22,
  Action,
} from "../types";

import {
  createAction,
  createLinearCampaign_V21,
  createLinearCampaign_V22,
  createTranchedCampaign_V22,
  generateAssetId,
  generateFactoryIdFromEvent,
  getOrCreateAsset_async,
  initialize_async,
} from "../helpers";
import { ActionCategory, isWhitelistedShape } from "../constants";

function loaderLinear_V21(input: CreateLinearLoader_V21) {
  const { context, event } = input;

  const assetId = generateAssetId(event, event.params.asset);
  const factoryId = generateFactoryIdFromEvent(event);
  const watcherId = event.chainId.toString();

  context.Asset.load(assetId);
  context.Factory.load(factoryId);
  context.Watcher.load(watcherId);

  context.contractRegistration.addMerkleLockupV21(event.params.merkleStreamer);
}

function loaderLinear_V22(input: CreateLinearLoader_V22) {
  const { context, event } = input;

  const assetId = generateAssetId(event, event.params.baseParams[0]);
  const factoryId = generateFactoryIdFromEvent(event);
  const watcherId = event.chainId.toString();

  context.Asset.load(assetId);
  context.Factory.load(factoryId);
  context.Watcher.load(watcherId);

  context.contractRegistration.addMerkleLockupV22(event.params.merkleLL);
}

function loaderTranched_V22(input: CreateTranchedLoader_V22) {
  const { context, event } = input;

  const assetId = generateAssetId(event, event.params.baseParams[0]);
  const factoryId = generateFactoryIdFromEvent(event);
  const watcherId = event.chainId.toString();

  context.Asset.load(assetId);
  context.Factory.load(factoryId);
  context.Watcher.load(watcherId);

  context.contractRegistration.addMerkleLockupV22(event.params.merkleLT);
}

async function handlerLinear_V21(input: CreateLinearHandler_V21) {
  const { context, event } = input;

  /** ------- Authorize -------- */

  if (!isWhitelistedShape(event.chainId, event.params.lockupLinear)) {
    return;
  }

  /** ------- Initialize -------- */

  let { watcher, factory, factories } = await initialize_async(
    event,
    context.Watcher.get,
    context.Factory.get,
  );

  /** ------- Fetch -------- */

  let asset = await getOrCreateAsset_async(
    event,
    event.params.asset,
    context.Asset.get,
  );

  /** ------- Process -------- */

  let { campaign, ...post_create } = await createLinearCampaign_V21(event, {
    asset,
    factory,
    watcher,
  });

  watcher = post_create.watcher;

  const post_action = createAction(event, watcher);

  watcher = post_action.watcher;

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Create,
    campaign_id: campaign.id,
  };

  /** ------- Update -------- */

  await context.Asset.set(asset);
  if (factories.length) {
    for (let i = 0; i < factories.length; i++) {
      if (factories[i].id === factory.id) {
        await context.Factory.set(factory);
      }
      await context.Factory.set(factories[i]);
    }
  }

  await context.Action.set(action);
  await context.Campaign.set(campaign);
  await context.Watcher.set(watcher);
}

async function handlerLinear_V22(input: CreateLinearHandler_V22) {
  const { context, event } = input;

  /** ------- Authorize -------- */

  if (!isWhitelistedShape(event.chainId, event.params.lockupLinear)) {
    return;
  }

  /** ------- Initialize -------- */

  let { watcher, factory, factories } = await initialize_async(
    event,
    context.Watcher.get,
    context.Factory.get,
  );

  /** ------- Fetch -------- */

  let asset = await getOrCreateAsset_async(
    event,
    event.params.baseParams[0],
    context.Asset.get,
  );

  /** ------- Process -------- */

  let { campaign, ...post_create } = await createLinearCampaign_V22(event, {
    asset,
    factory,
    watcher,
  });

  watcher = post_create.watcher;

  const post_action = createAction(event, watcher);

  watcher = post_action.watcher;

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Create,
    campaign_id: campaign.id,
  };

  /** ------- Update -------- */

  await context.Asset.set(asset);
  if (factories.length) {
    for (let i = 0; i < factories.length; i++) {
      if (factories[i].id === factory.id) {
        await context.Factory.set(factory);
      }
      await context.Factory.set(factories[i]);
    }
  }

  await context.Action.set(action);
  await context.Campaign.set(campaign);
  await context.Watcher.set(watcher);
}

async function handlerTranched_V22(input: CreateTranchedHandler_V22) {
  const { context, event } = input;

  /** ------- Authorize -------- */

  if (!isWhitelistedShape(event.chainId, event.params.lockupTranched)) {
    return;
  }

  /** ------- Initialize -------- */

  let { watcher, factory, factories } = await initialize_async(
    event,
    context.Watcher.get,
    context.Factory.get,
  );

  /** ------- Fetch -------- */

  let asset = await getOrCreateAsset_async(
    event,
    event.params.baseParams[0],
    context.Asset.get,
  );

  /** ------- Process -------- */

  let { campaign, tranches, ...post_create } = await createTranchedCampaign_V22(
    event,
    {
      asset,
      factory,
      watcher,
    },
  );

  watcher = post_create.watcher;

  const post_action = createAction(event, watcher);

  watcher = post_action.watcher;

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Create,
    campaign_id: campaign.id,
  };

  /** ------- Update -------- */

  await context.Asset.set(asset);
  if (factories.length) {
    for (let i = 0; i < factories.length; i++) {
      if (factories[i].id === factory.id) {
        await context.Factory.set(factory);
      }
      await context.Factory.set(factories[i]);
    }
  }

  if (tranches.length) {
    for (let i = 0; i < tranches.length; i++) {
      await context.Tranche.set(tranches[i]);
    }
  }

  await context.Action.set(action);
  await context.Campaign.set(campaign);
  await context.Watcher.set(watcher);
}

LoaderLinear_V21(loaderLinear_V21);
HandlerLinearAsync_V21(handlerLinear_V21);

LoaderLinear_V22(loaderLinear_V22);
HandlerLinearAsync_V22(handlerLinear_V22);

LoaderTranched_V22(loaderTranched_V22);
HandlerTranchedAsync_V22(handlerTranched_V22);
