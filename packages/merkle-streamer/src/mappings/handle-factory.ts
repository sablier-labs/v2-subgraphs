import { ContractMerkleStreamerLL as ContractCampaignLL } from "../generated/types/templates";
import { CreateMerkleStreamerLL as EventCreateCampaignLL } from "../generated/types/templates/ContractMerkleStreamerFactory/SablierV2MerkleStreamerFactory";
import { createCampaignLinear } from "../helpers";

export function handleCreateCampaignLL(event: EventCreateCampaignLL): void {
  let campaign = createCampaignLinear(event);
  if (campaign == null) {
    return;
  }

  ContractCampaignLL.create(event.params.merkleStreamer);
  campaign.save();
}
