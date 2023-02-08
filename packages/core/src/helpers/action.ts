import { dataSource, ethereum, log } from "@graphprotocol/graph-ts";
import { Action } from "../generated/types/schema";
import { getContractById } from "./contract";

export function generateActionId(event: ethereum.Event): string {
  return event.transaction.hash
    .toHexString()
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

  /** --------------- */
  let contract = getContractById(dataSource.address().toHexString());
  if (contract == null) {
    log.critical(
      "[SABLIER] Contract hasn't been registered before this create event: {}",
      [dataSource.address().toHexString()],
    );
  } else {
    entity.contract = contract.id;
  }

  return entity;
}
