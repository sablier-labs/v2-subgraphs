import { log } from "@graphprotocol/graph-ts";
import {
  Claim as EventClaim,
  Clawback as EventClawback,
  TransferAdmin as EventTransferAdmin,
} from "../generated/types/templates/ContractMerkleStreamerFactory/SablierV2MerkleStreamerLL";
import { one } from "../constants";
import {
  createAction,
  generateStreamId,
  getCampaignById,
  getOrCreateActivity,
} from "../helpers";

export function handleClaim(event: EventClaim): void {
  let action = createAction(event);
  if (action == null) {
    log.critical(
      "[SABLIER] Campaign not registered yet, cannot bind action",
      [],
    );
    return;
  }

  let campaign = getCampaignById(action.campaign);
  if (campaign == null) {
    log.critical("[SABLIER] Campaign not registered yet", []);
    return;
  }

  /** --------------- */
  action.category = "Claim";
  action.claimIndex = event.params.index;
  action.claimAmount = event.params.amount;
  action.claimRecipient = event.params.recipient;
  action.claimTokenId = event.params.streamId;
  action.claimStreamId = generateStreamId(
    campaign.lockup,
    event.params.streamId,
  );

  /** --------------- */
  campaign.claimedAmount = campaign.claimedAmount.plus(event.params.amount);
  campaign.claimedCount = campaign.claimedCount.plus(one);
  campaign.save();

  /** --------------- */
  let activity = getOrCreateActivity(campaign.id, event);
  if (activity == null) {
    log.critical("[SABLIER] Activity not registered yet", []);
    return;
  }

  activity.claims = activity.claims.plus(one);
  activity.amount = activity.amount.plus(event.params.amount);
  activity.save();

  /** --------------- */
  action.save();
}

export function handleClawback(event: EventClawback): void {
  let action = createAction(event);
  if (action == null) {
    log.critical(
      "[SABLIER] Campaign not registered yet, cannot bind action",
      [],
    );
    return;
  }

  let campaign = getCampaignById(action.campaign);
  if (campaign == null) {
    log.critical("[SABLIER] Campaign not registered yet", []);
    return;
  }

  /** --------------- */
  action.category = "Clawback";
  action.clawbackFrom = event.params.admin;
  action.clawbackTo = event.params.to;
  action.clawbackAmount = event.params.amount;

  /** --------------- */
  campaign.clawbackTime = event.block.timestamp;
  campaign.clawbackAction = action.id;
  campaign.save();

  /** --------------- */
  action.save();
}
export function handleTransferAdmin(event: EventTransferAdmin): void {
  let action = createAction(event);
  if (action == null) {
    log.critical(
      "[SABLIER] Campaign not registered yet, cannot bind action",
      [],
    );
    return;
  }

  let campaign = getCampaignById(action.campaign);
  if (campaign == null) {
    log.critical("[SABLIER] Campaign not registered yet", []);
    return;
  }

  /** --------------- */
  action.category = "TransferAdmin";

  /** --------------- */
  campaign.admin = event.params.newAdmin;
  campaign.save();

  /** --------------- */
  action.save();
}
