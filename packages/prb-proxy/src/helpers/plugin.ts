import { Address } from "@graphprotocol/graph-ts";
import { Plugin } from "../generated/types/schema";
import { InstallPlugin as EvertInstallPlugin } from "../generated/types/templates/ContractPRBProxy/PRBProxyRegistry";

export function getPluginById(id: string): Plugin | null {
  return Plugin.load(id);
}

export function getOrCreatePlugin(
  id: string,
  event: EvertInstallPlugin,
): Plugin {
  let plugin = getPluginById(id);
  if (plugin == null) {
    return createPlugin(event);
  }
  return plugin;
}

export function createPlugin(event: EvertInstallPlugin): Plugin {
  let id = event.params.plugin.toHexString();
  let entity = new Plugin(id);

  entity.address = Address.fromHexString(id);
  entity.timestamp = event.block.timestamp;
  entity.methods = event.params.methods;

  return entity;
}
