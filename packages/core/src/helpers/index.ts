import {
  Address,
  BigInt,
  dataSource,
  ethereum,
  log,
} from "@graphprotocol/graph-ts";
import {
  Action,
  Batch,
  Batcher,
  Contract,
  Stream,
  Token,
  Watcher,
} from "../generated/types/schema";
import { ERC20 as ERC20Contract } from "../generated/types/templates/ContractLinear/ERC20";
import { getChainId, one, zero } from "../constants";

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

export function generateStreamId(localId: BigInt): string {
  let contract = getContractById(dataSource.address().toHexString());
  if (contract == null) {
    log.critical(
      "[SABLIER] Contract hasn't been registered before this create event: {}",
      [dataSource.address().toHexString()],
    );
    return "";
  }

  let id = contract.address
    .toHexString()
    .concat("-")
    .concat(localId.toString());

  return id;
}

export function getStreamByIdFromSource(localId: BigInt): Stream | null {
  let id = generateStreamId(localId);
  return Stream.load(id);
}

export function getOrCreateToken(address: Address): Token {
  let id = address.toHexString();
  let entity = Token.load(id);

  if (entity == null) {
    entity = new Token(address.toHexString());

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

export function getContractById(id: string): Contract | null {
  return Contract.load(id);
}

export function createContract(address: Address, category: string): Contract {
  let id = address.toHexString();
  let entity = getContractById(id);
  if (entity == null) {
    entity = new Contract(id);
  }

  entity.address = address;
  entity.category = category;

  entity.save();

  return entity;
}

export function getOrCreateBatcher(sender: Address): Batcher {
  let id = sender.toHexString();
  let entity = Batcher.load(id);

  if (entity == null) {
    entity = new Batcher(id);
    entity.address = sender;
    entity.batchIndex = zero;
  }

  return entity;
}

export function getOrCreateBatch(
  event: ethereum.Event,
  sender: Address,
): Batch {
  let id = event.transaction.hash.toHexString();
  let entity = Batch.load(id);
  let batcher = getOrCreateBatcher(sender);

  if (entity == null) {
    entity = new Batch(id);
    entity.hash = event.transaction.hash;
    entity.timestamp = event.block.timestamp;
    entity.batcher = batcher.id;
    entity.count = one;
  } else {
    entity.count = entity.count.plus(one);
    if (BigInt.compare(entity.count, one) == 1 && entity.label == null) {
      let label = batcher.batchIndex.plus(one).toString();
      entity.label = label;
      batcher.batchIndex = batcher.batchIndex.plus(one);
      batcher.save();
    }
  }

  entity.save();

  return entity;
}

export function getOrCreateWatcher(): Watcher {
  let id = "1";
  let entity = Watcher.load(id);

  if (entity == null) {
    entity = new Watcher(id);
    entity.chainId = getChainId();
    entity.streamIndex = one;
    entity.isInitialized = false;
  }

  return entity;
}
