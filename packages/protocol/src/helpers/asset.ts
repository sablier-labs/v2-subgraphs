import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Asset } from "../generated/types/schema";
import { ERC20 as ERC20Contract } from "../generated/types/templates/ContractLockupLinear/ERC20";
import { getChainId } from "../constants";

export function getOrCreateAsset(address: Address): Asset {
  let id = address.toHexString();
  let entity = Asset.load(id);

  if (entity == null) {
    entity = new Asset(address.toHexString());

    let contract = ERC20Contract.bind(address);
    let decimals = contract.decimals();
    let symbol = contract.symbol();
    let name = contract.name();

    entity.chainId = getChainId();
    entity.address = address;
    entity.symbol = symbol;
    entity.name = name;
    entity.decimals = BigInt.fromI32(decimals);

    entity.save();
  }

  return entity;
}
