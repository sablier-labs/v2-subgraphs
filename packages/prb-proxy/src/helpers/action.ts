import { dataSource, ethereum, log } from "@graphprotocol/graph-ts";
import { Action } from "../generated/types/schema";
import { getChainId } from "../constants";
import { getProxyById } from "./proxy";

export function generateActionId(event: ethereum.Event): string {
  return ""
    .concat(event.transaction.hash.toHexString())
    .concat("-")
    .concat(event.logIndex.toString());
}

export function createAction(event: ethereum.Event): Action {
  let id = generateActionId(event);
  let entity = new Action(id);

  entity.block = event.block.number;
  entity.from = event.transaction.from;
  entity.hash = event.transaction.hash;
  entity.timestamp = event.block.timestamp;
  entity.chainId = getChainId();

  /** --------------- */
  let proxy = getProxyById(dataSource.address().toHexString());
  if (proxy == null) {
    log.critical(
      "[PRBPROXY] Proxy hasn't been registered before this create event: {}",
      [dataSource.address().toHexString()],
    );
  } else {
    entity.proxy = proxy.id;
  }

  return entity;
}
