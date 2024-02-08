import { ContractMerkleStreamerLL as ContractCampaignLL } from "../generated/types/templates";
import { CreateMerkleStreamerLL as EventCreateCampaignLL } from "../generated/types/templates/ContractMerkleStreamerFactory/SablierV2MerkleStreamerFactory";
import { log_exit } from "../constants";
import { createAction, createCampaignLinear } from "../helpers";

export function handleCreateCampaignLL(event: EventCreateCampaignLL): void {
  let campaign = createCampaignLinear(event);
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
