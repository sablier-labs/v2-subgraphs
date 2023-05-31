import { Address, dataSource, ethereum, log } from "@graphprotocol/graph-ts";
import { Proxy } from "../generated/types/schema";
import {
  Execute as EventExecute,
  RunPlugin as EventRunPlugin,
} from "../generated/types/templates/ContractPRBProxy/PRBProxy";
import { createAction, getOrCreateOwner, getProxyById } from "../helpers";

export function handleActionExecute(event: EventExecute): void {
  let id = dataSource.address().toHexString();
  let proxy = getProxyById(id);

  if (proxy == null) {
    log.info(
      "[PRBPROXY] Proxy hasn't been registered before this execute event: {}",
      [dataSource.address().toHexString()],
    );
    log.critical("[PRBPROXY]", []);
  } else {
    let action = createAction(proxy, event);
    let owner = getOrCreateOwner(proxy.owner);
    action.category = "Execute";
    action.proxy = proxy.id;
    action.ownerSnapshot = Address.fromHexString(owner.id);
    action.data = event.params.data;
    action.response = event.params.response;
    action.target = event.params.target;

    action.save();
  }
}

export function handleActionRunPlugin(event: EventRunPlugin): void {
  let id = dataSource.address().toHexString();
  let proxy = getProxyById(id);

  if (proxy == null) {
    log.info(
      "[PRBPROXY] Proxy hasn't been registered before this plugin run event: {}",
      [dataSource.address().toHexString()],
    );
    log.critical("[PRBPROXY]", []);
  } else {
    let action = createAction(proxy, event);
    let owner = getOrCreateOwner(proxy.owner);
    action.category = "Execute";
    action.proxy = proxy.id;
    action.ownerSnapshot = Address.fromHexString(owner.id);
    action.data = event.params.data;
    action.response = event.params.response;
    action.plugin = event.params.plugin;

    action.save();
  }
}

export function handleActionDeploy(proxy: Proxy, event: ethereum.Event): void {
  let action = createAction(proxy, event);

  action.category = "Deploy";
  action.proxy = proxy.id;
  action.ownerSnapshot = Address.fromHexString(proxy.owner);
  action.save();
}

export function handleActionTransfer(
  proxy: Proxy,
  event: ethereum.Event,
): void {
  let action = createAction(proxy, event);

  action.category = "Transfer";
  action.proxy = proxy.id;
  action.ownerSnapshot = Address.fromHexString(proxy.owner);
  action.save();
}
