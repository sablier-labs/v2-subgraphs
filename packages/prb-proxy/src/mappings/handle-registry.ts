import { dataSource, log } from "@graphprotocol/graph-ts";
import { ContractPRBProxy as ProxyTemplate } from "../generated/types/templates";
import {
  DeployProxy as EventDeployProxy,
  UninstallPlugin as EventUninstallPlugin,
  InstallPlugin as EvertInstallPlugin,
} from "../generated/types/templates/ContractPRBProxy/PRBProxyRegistry";
import {
  createProxy,
  getOrCreatePlugin,
  getPluginById,
  getProxyById,
} from "../helpers";
import {
  handleActionDeploy,
  handleActionInstallPlugin,
  handleActionUninstallPlugin,
} from "./handle-actions";

export function handleDeploy(event: EventDeployProxy): void {
  let id = event.params.proxy.toHexString();
  let proxy = createProxy(id, event);

  proxy.operator = event.params.operator;
  proxy.owner = event.params.owner;

  proxy.save();

  handleActionDeploy(proxy, event);
  ProxyTemplate.create(event.params.proxy);
}

export function handleInstallPlugin(event: EvertInstallPlugin): void {
  let id = event.params.proxy.toHexString();
  let proxy = getProxyById(id);

  if (proxy == null) {
    log.info(
      "[PRBPROXY] Proxy hasn't been registered before this transfer event: {}",
      [dataSource.address().toHexString()],
    );
    log.error("[PRBPROXY]", []);
  } else {
    let pluginId = event.params.plugin.toHexString();
    let plugin = getOrCreatePlugin(pluginId, event);

    let plugins = proxy.plugins;
    plugins.push(plugin.id);

    proxy.plugins = plugins;
    proxy.save();

    handleActionInstallPlugin(proxy, event);
  }
}

export function handleUninstallPlugin(event: EventUninstallPlugin): void {
  let id = event.params.proxy.toHexString();
  let proxy = getProxyById(id);

  if (proxy == null) {
    log.info(
      "[PRBPROXY] Proxy hasn't been registered before this transfer event: {}",
      [dataSource.address().toHexString()],
    );
    log.error("[PRBPROXY]", []);
  } else {
    let pluginId = event.params.plugin.toHexString();
    let plugin = getPluginById(pluginId);

    if (plugin != null) {
      let plugins = proxy.plugins;
      let index = plugins.indexOf(pluginId);

      if (index >= 0) {
        plugins = plugins.splice(index, 1);

        proxy.plugins = plugins;
        proxy.save();
      }
    }

    handleActionUninstallPlugin(proxy, event);
  }
}
