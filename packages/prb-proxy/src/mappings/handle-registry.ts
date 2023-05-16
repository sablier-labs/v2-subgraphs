import { dataSource, log } from "@graphprotocol/graph-ts";
import { ContractPRBProxy as ProxyTemplate } from "../generated/types/templates";
import {
  DeployProxy as EventDeployProxy,
  TransferOwnership as EventTransferOwnership,
} from "../generated/types/templates/ContractPRBProxy/PRBProxyRegistry";
import {
  createProxy,
  getOrCreateOwner,
  getOrCreateOwnership,
  getProxyById,
} from "../helpers";
import { handleActionDeploy, handleActionTransfer } from "./handle-actions";

export function handleDeploy(event: EventDeployProxy): void {
  let id = event.params.proxy.toHexString();
  let proxy = createProxy(id, event);

  proxy.salt = event.params.salt;
  proxy.seed = event.params.seed;

  let owner = getOrCreateOwner(event.params.owner.toHexString());
  let ownership = getOrCreateOwnership(owner.id, id, event);

  proxy.owner = owner.id;
  ownership.save();
  proxy.ownership = ownership.id;
  proxy.save();

  handleActionDeploy(proxy, event);
  ProxyTemplate.create(event.params.proxy);
}

export function handleTransferOwnership(event: EventTransferOwnership): void {
  let id = event.params.proxy.toHexString();
  let proxy = getProxyById(id);

  if (proxy == null) {
    log.critical(
      "[PRBPROXY] Proxy hasn't been registered before this transfer event: {}",
      [dataSource.address().toHexString()],
    );
  } else {
    let owner = getOrCreateOwner(event.params.newOwner.toHexString());
    let ownership = getOrCreateOwnership(owner.id, id, event);

    owner.save();
    ownership.save();

    proxy.owner = owner.id;
    proxy.ownership = ownership.id;

    proxy.save();

    handleActionTransfer(proxy, event);
  }
}
