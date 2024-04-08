import {
  ContractMerkleLockupLL as ContractCampaignLL,
  ContractMerkleLockupLT as ContractCampaignLT,
} from "../generated/types/templates";
import {
  CreateMerkleStreamerLL as EventCreateCampaignLL_V21,
  CreateMerkleLockupLL as EventCreateCampaignLL_V22,
  CreateMerkleLockupLT as EventCreateCampaignLT_V22,
} from "../generated/types/templates/ContractMerkleLockupFactory/SablierV2MerkleLockupFactory";
import { log_exit } from "../constants";
import {
  createAction,
  createCampaignLinear_V21,
  createCampaignLinear_V22,
  createCampaignTranched_V22,
} from "../helpers";

export function handleCreateCampaignLL_V21(
  event: EventCreateCampaignLL_V21,
): void {
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
  let campaign = createCampaignLinear_V22(event);
  if (campaign == null) {
    return;
  }

  ContractCampaignLL.create(event.params.merkleLockupLL);
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
  let campaign = createCampaignTranched_V22(event);
  if (campaign == null) {
    return;
  }

  ContractCampaignLT.create(event.params.merkleLockupLT);
  campaign.save();

  let action = createAction(event, "Create");
  if (action == null) {
    log_exit("Campaign not registered yet, cannot bind action");
    return;
  }
  action.campaign = campaign.id;
  action.save();
}
