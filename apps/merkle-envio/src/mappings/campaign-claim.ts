import {
  MerkleLLV21Contract_Claim_handler as HandlerLinear_V21,
  MerkleLLV21Contract_Claim_loader as LoaderLinear_V21,
} from "../../generated/src/Handlers.gen";

import type { Action, ClaimHandler, ClaimLoader } from "../types";

import {
  createAction,
  generateStreamId,
  generateCampaignId,
  getOrCreateWatcher,
  getCampaign,
  generateActivityId,
  getOrCreateActivity,
} from "../helpers";
import { ActionCategory } from "../constants";

function loader(input: ClaimLoader) {
  const { context, event } = input;

  const campaignId = generateCampaignId(event, event.srcAddress);
  const activityId = generateActivityId(event, campaignId);
  const watcherId = event.chainId.toString();

  context.Activity.load(activityId, {});
  context.Campaign.load(campaignId, {});
  context.Watcher.load(watcherId);
}

function handler(input: ClaimHandler) {
  const { context, event } = input;

  /** ------- Fetch -------- */

  let watcher = getOrCreateWatcher(event, context.Watcher.get);
  let campaign = getCampaign(event, context.Campaign.get);
  let activity = getOrCreateActivity(event, campaign?.id, context.Activity.get);

  /** ------- Process -------- */

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Claim,
    campaign_id: campaign.id,
    /** --------------- */
    claimIndex: BigInt(event.params.index),
    claimAmount: BigInt(event.params.amount),
    claimRecipient: event.params.recipient.toLowerCase(),
    claimTokenId: BigInt(event.params.streamId),
    claimStreamId: generateStreamId(
      event,
      campaign.lockup,
      event.params.streamId,
    ),
  };

  watcher = post_action.watcher;

  campaign = {
    ...campaign,
    claimedAmount: BigInt(campaign.claimedAmount) + BigInt(event.params.amount),
    claimedCount: BigInt(campaign.claimedCount) + 1n,
  };

  /** ------- Process: Activity -------- */

  activity = {
    ...activity,
    claims: BigInt(activity.claims) + 1n,
    amount: BigInt(activity.amount) + BigInt(event.params.amount),
  };

  context.Action.set(action);
  context.Activity.set(activity);
  context.Campaign.set(campaign);
  context.Watcher.set(watcher);
}

LoaderLinear_V21(loader);
HandlerLinear_V21(handler);
