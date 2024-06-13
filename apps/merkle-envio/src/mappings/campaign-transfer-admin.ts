import {
  MerkleLockupV21Contract_TransferAdmin_handler as Handler_V21,
  MerkleLockupV21Contract_TransferAdmin_loader as Loader_V21,
  MerkleLockupV22Contract_TransferAdmin_handler as Handler_V22,
  MerkleLockupV22Contract_TransferAdmin_loader as Loader_V22,
} from "../../generated/src/Handlers.gen";

import type {
  Action,
  TransferAdminHandler,
  TransferAdminLoader,
} from "../types";

import {
  createAction,
  generateCampaignId,
  getOrCreateWatcher,
  getCampaign,
  generateCampaignNickname,
} from "../helpers";
import { ActionCategory } from "../constants";

function loader(input: TransferAdminLoader) {
  const { context, event } = input;

  const campaignId = generateCampaignId(event, event.srcAddress);
  const watcherId = event.chainId.toString();

  context.Campaign.load(campaignId, {
    loadAsset: true,
  });
  context.Watcher.load(watcherId);
}

function handler(input: TransferAdminHandler) {
  const { context, event } = input;

  /** ------- Fetch -------- */

  let watcher = getOrCreateWatcher(event, context.Watcher.get);
  let campaign = getCampaign(event, context.Campaign.get);
  let asset = context.Campaign.getAsset(campaign);

  /** ------- Process -------- */

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.TransferAdmin,
    campaign_id: campaign.id,
  };

  watcher = post_action.watcher;

  campaign = {
    ...campaign,
    admin: event.params.newAdmin.toLowerCase(),
  };

  campaign = {
    ...campaign,
    nickname: generateCampaignNickname(campaign, asset),
  };

  context.Action.set(action);
  context.Campaign.set(campaign);
  context.Watcher.set(watcher);
}

Loader_V21(loader);
Handler_V21(handler);

Loader_V22(loader);
Handler_V22(handler);
