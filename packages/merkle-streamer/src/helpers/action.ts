import { dataSource, ethereum, log } from "@graphprotocol/graph-ts";
import { Action } from "../generated/types/schema";
import { getChainId, one } from "../constants";
import { getCampaignById } from "./campaign";
import { getOrCreateWatcher } from "./watcher";

export function generateActionId(event: ethereum.Event): string {
  return ""
    .concat(event.transaction.hash.toHexString())
    .concat("-")
    .concat(event.logIndex.toString());
}

export function getActionById(id: string): Action | null {
  return Action.load(id);
}

export function createAction(event: ethereum.Event): Action | null {
  let watcher = getOrCreateWatcher();
  let id = generateActionId(event);
  let entity = new Action(id);

  entity.block = event.block.number;
  entity.from = event.transaction.from;
  entity.hash = event.transaction.hash;
  entity.timestamp = event.block.timestamp;
  entity.subgraphId = watcher.actionIndex;
  entity.chainId = getChainId();

  /** --------------- */
  let campaign = getCampaignById(dataSource.address().toHexString());
  if (campaign == null) {
    log.info(
      "[SABLIER] Campaign hasn't been registered before this clawback event: {}",
      [id],
    );
    log.error("[SABLIER]", []);
    return null;
  }

  entity.campaign = campaign.id;

  /** --------------- */
  watcher.actionIndex = watcher.actionIndex.plus(one);
  watcher.save();

  return entity;
}
