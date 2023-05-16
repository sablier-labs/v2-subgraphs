import { ethereum } from "@graphprotocol/graph-ts";
import { Action, Proxy } from "../generated/types/schema";
import { getChainId } from "../constants";

export function generateActionId(event: ethereum.Event): string {
  return ""
    .concat(event.transaction.hash.toHexString())
    .concat("-")
    .concat(event.logIndex.toString());
}

export function createAction(proxy: Proxy, event: ethereum.Event): Action {
  let id = generateActionId(event);
  let entity = new Action(id);

  entity.block = event.block.number;
  entity.from = event.transaction.from;
  entity.hash = event.transaction.hash;
  entity.timestamp = event.block.timestamp;
  entity.chainId = getChainId();

  /** --------------- */
  entity.proxy = proxy.id;

  return entity;
}
