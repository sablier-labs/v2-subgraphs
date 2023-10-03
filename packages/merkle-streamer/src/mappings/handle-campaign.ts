import {
  Claim as EventClaim,
  Clawback as EventClawback,
  TransferAdmin as EventTransferAdmin,
} from "../generated/types/templates/ContractMerkleStreamerFactory/SablierV2MerkleStreamerLL";

export function handleClaim(_event: EventClaim): void {}

export function handleClawback(_event: EventClawback): void {}
export function handleTransferAdmin(_event: EventTransferAdmin): void {}
