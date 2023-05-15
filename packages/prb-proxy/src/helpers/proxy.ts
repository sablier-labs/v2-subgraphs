import { Address, ethereum } from "@graphprotocol/graph-ts";
import { Proxy } from "../generated/types/schema";
import { getChainId } from "../constants";

export function getProxyById(id: string): Proxy | null {
  return Proxy.load(id);
}

export function createProxy(address: Address, event: ethereum.Event): Proxy {
  let id = address.toHexString();
  let entity = getProxyById(id);
  if (entity == null) {
    entity = new Proxy(id);
  }

  entity.address = address;

  entity.block = event.block.number;
  entity.from = event.transaction.from;
  entity.hash = event.transaction.hash;
  entity.timestamp = event.block.timestamp;
  entity.chainId = getChainId();

  return entity;
}
