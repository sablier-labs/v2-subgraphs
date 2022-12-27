import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { Action, Contract, Stream, Token } from "../generated/types/schema";
import { ERC20 as ERC20Contract } from "../generated/types/templates/ContractLinear/ERC20";

export function generateActionId(event: ethereum.Event): string {
  return event.transaction.hash
    .toHexString()
    .concat("-")
    .concat(event.logIndex.toString());
}

export function createAction(event: ethereum.Event): Action {
  let id = generateActionId(event);
  let entity = new Action(id);

  entity.save();
  return entity;
}

export function getStreamById(id: string): Stream | null {
  return Stream.load(id);
}

export function getContractById(id: string): Contract | null {
  return Contract.load(id);
}

export function getOrCreateToken(address: Address): Token {
  let id = address.toHexString();
  let entity = Token.load(id);

  if (entity == null) {
    entity = new Token(address.toHexString());

    let contract = ERC20Contract.bind(address);
    let decimals = contract.decimals();
    let symbol = contract.symbol();

    entity.address = address;
    entity.symbol = symbol;
    entity.decimals = BigInt.fromI32(decimals);
    entity.streams = [];

    entity.save();
  }

  return entity;
}

export function createContract(address: Address, type: string): Contract {
  let id = address.toHexString();
  let entity = getContractById(id);
  if (entity == null) {
    entity = new Contract(id);
  }

  entity.address = address;
  entity.streams = [];
  entity.actions = [];
  entity.type = type;

  entity.save();

  return entity;
}
