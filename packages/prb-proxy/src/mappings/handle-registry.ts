import {
  DeployProxy as EventDeployProxy,
  TransferOwnership as EventTransferOwnership,
} from "../generated/types/templates/ContractPRBProxy/PRBProxyRegistry";
import { createProxy, getOrCreateOwner } from "../helpers";

export function handleDeploy(event: EventDeployProxy) {
  let id = event.params.proxy;
  let proxy = createProxy(id, event);

  proxy.salt = event.params.salt;
  proxy.seed = event.params.seed;

  let owner = getOrCreateOwner(event.params.owner.toHexString());
  proxy.owner = owner.id;
}

export function handleTransferOwnership(_event: EventTransferOwnership) {}
