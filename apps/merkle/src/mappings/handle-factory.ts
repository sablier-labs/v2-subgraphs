import {
  ContractMerkleLL as ContractCampaignLL,
  ContractMerkleLT as ContractCampaignLT,
} from "../generated/types/templates";
import {
  CreateMerkleStreamerLL as EventCreateCampaignLL_V21,
  CreateMerkleLL as EventCreateCampaignLL_V22,
  CreateMerkleLT as EventCreateCampaignLT_V22,
} from "../generated/types/templates/ContractMerkleLockupFactory/SablierV2MerkleLockupFactory";
import { isWhitelistedShape, log_debug, log_exit } from "../constants";
import {
  createAction,
  createCampaignLinear_V21,
  createCampaignLinear_V22,
  createCampaignTranched_V22,
} from "../helpers";

export function handleCreateCampaignLL_V21(
  event: EventCreateCampaignLL_V21,
): void {
  if (!isWhitelistedShape(event.params.lockupLinear)) {
    log_debug("Campaign skipped, shape contract not whitelisted: {}", [
      event.params.lockupLinear.toString(),
    ]);
    return;
  }

  let campaign = createCampaignLinear_V21(event);
  if (campaign == null) {
    return;
  }

  ContractCampaignLL.create(event.params.merkleStreamer);
  campaign.save();

  let action = createAction(event, "Create");
  if (action == null) {
    log_exit("Campaign not registered yet, cannot bind action");
    return;
  }
  action.campaign = campaign.id;
  action.save();
}

export function handleCreateCampaignLL_V22(
  event: EventCreateCampaignLL_V22,
): void {
  if (!isWhitelistedShape(event.params.lockupLinear)) {
    log_debug("Campaign skipped, shape contract not whitelisted: {}", [
      event.params.lockupLinear.toString(),
    ]);
    return;
  }

  let campaign = createCampaignLinear_V22(event);
  if (campaign == null) {
    return;
  }

  ContractCampaignLL.create(event.params.merkleLL);
  campaign.save();

  let action = createAction(event, "Create");
  if (action == null) {
    log_exit("Campaign not registered yet, cannot bind action");
    return;
  }
  action.campaign = campaign.id;
  action.save();
}

export function handleCreateCampaignLT_V22(
  event: EventCreateCampaignLT_V22,
): void {
  if (!isWhitelistedShape(event.params.lockupTranched)) {
    log_debug("Campaign skipped, shape contract not whitelisted: {}", [
      event.params.lockupTranched.toString(),
    ]);
    return;
  }

  let campaign = createCampaignTranched_V22(event);
  if (campaign == null) {
    return;
  }

  ContractCampaignLT.create(event.params.merkleLT);
  campaign.save();

  let action = createAction(event, "Create");
  if (action == null) {
    log_exit("Campaign not registered yet, cannot bind action");
    return;
  }
  action.campaign = campaign.id;
  action.save();
}
