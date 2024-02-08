import {
  MerkleLLV21Contract_TransferAdmin_handler as HandlerLinear_V21,
  MerkleLLV21Contract_TransferAdmin_loader as LoaderLinear_V21,
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
} from "../helpers";
import { ActionCategory } from "../constants";

function loader(input: TransferAdminLoader) {
  const { context, event } = input;

  const campaignId = generateCampaignId(event, event.srcAddress);
  const watcherId = event.chainId.toString();

  context.Campaign.load(campaignId, {});
  context.Watcher.load(watcherId);
}

function handler(input: TransferAdminHandler) {
  const { context, event } = input;

  /** ------- Fetch -------- */

  let watcher = getOrCreateWatcher(event, context.Watcher.get);
  let campaign = getCampaign(event, context.Campaign.get);

  /** ------- Process -------- */

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.TransferAdmin,
    campaign: campaign.id,
  };

  watcher = post_action.watcher;

  campaign = {
    ...campaign,
    admin: event.params.newAdmin.toLowerCase(),
  };

  context.Action.set(action);
  context.Campaign.set(campaign);
  context.Watcher.set(watcher);
}

LoaderLinear_V21(loader);
HandlerLinear_V21(handler);
