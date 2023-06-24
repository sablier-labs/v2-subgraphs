import { Address, log } from "@graphprotocol/graph-ts";
import {
  Comptroller,
  ComptrollerFlashAsset,
  ComptrollerProtocolFee,
} from "../generated/types/schema";
import { SablierV2LockupDynamic as LockupDynamicContract } from "../generated/types/templates/ContractLockupDynamic/SablierV2LockupDynamic";
import { SablierV2Comptroller as ComptrollerContract } from "../generated/types/templates/ContractLockupLinear/SablierV2Comptroller";
import { SablierV2LockupLinear as LockupLinearContract } from "../generated/types/templates/ContractLockupLinear/SablierV2LockupLinear";
import { zero } from "../constants";
import { getOrCreateAsset } from "../helpers";

export function getOrCreateComptroller(address: Address): Comptroller {
  let id = address.toHexString();
  let entity = Comptroller.load(id);

  if (entity == null) {
    entity = new Comptroller(id);
    let contract = ComptrollerContract.bind(address);

    let admin = contract.try_admin();
    let flashFee = contract.try_flashFee();

    if (admin.reverted || flashFee.reverted) {
      log.error(
        "[SABLIER] Comptroller hasn't been properly registered or isn't compliant: {}",
        [id],
      );
    }

    if (!flashFee.reverted) {
      entity.flashFee = flashFee.value;
    }

    if (!admin.reverted) {
      entity.admin = admin.value;
    }

    entity.address = address;
    entity.save();
  }

  return entity;
}

export function getOrCreateComptrollerFlashAsset(
  comptrollerAddress: Address,
  assetAddress: Address,
): ComptrollerFlashAsset {
  let comptroller = getOrCreateComptroller(comptrollerAddress);

  let id = "flash"
    .concat("-")
    .concat(comptrollerAddress.toHexString())
    .concat("-")
    .concat(assetAddress.toHexString());

  let entity = ComptrollerFlashAsset.load(id);

  if (entity == null) {
    entity = new ComptrollerFlashAsset(id);
    entity.comptroller = comptroller.id;
    entity.asset = getOrCreateAsset(assetAddress).id;
    entity.enabled = false;
    entity.save();
  }

  return entity;
}

export function getOrCreateComptrollerProtocolFee(
  comptrollerAddress: Address,
  assetAddress: Address,
): ComptrollerProtocolFee {
  let comptroller = getOrCreateComptroller(comptrollerAddress);

  let id = "fee"
    .concat("-")
    .concat(comptrollerAddress.toHexString())
    .concat("-")
    .concat(assetAddress.toHexString());

  let entity = ComptrollerProtocolFee.load(id);

  if (entity == null) {
    entity = new ComptrollerProtocolFee(id);
    entity.comptroller = comptroller.id;
    entity.asset = getOrCreateAsset(assetAddress).id;
    entity.amount = zero;
    entity.save();
  }

  return entity;
}

export function getOrCreateComptrollerFromContract(
  address: Address,
  category: string,
): Comptroller | null {
  if (category === "LockupLinear") {
    let instance = LockupLinearContract.bind(address);
    let comptrollerId = instance.try_comptroller();
    if (comptrollerId.reverted) {
      log.error(
        "[SABLIER] Comptroller hasn't been properly assigned the following lockup contract: {}",
        [address.toHexString()],
      );
    } else {
      let comptroller = getOrCreateComptroller(comptrollerId.value);
      return comptroller;
    }
  } else if (category === "LockupDynamic") {
    let instance = LockupDynamicContract.bind(address);
    let comptrollerId = instance.try_comptroller();
    if (comptrollerId.reverted) {
      log.error(
        "[SABLIER] Comptroller hasn't been properly assigned to the following lockup contract: {}",
        [address.toHexString()],
      );
    } else {
      let comptroller = getOrCreateComptroller(comptrollerId.value);
      return comptroller;
    }
  }

  return null;
}
