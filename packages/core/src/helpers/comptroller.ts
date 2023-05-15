import { Address, log } from "@graphprotocol/graph-ts";
import {
  Comptroller,
  ComptrollerFlashAsset,
  ComptrollerProtocolFee,
} from "../generated/types/schema";
import { ContractComptroller as ComptrollerTemplate } from "../generated/types/templates";
import { SablierV2Comptroller as ComptrollerContract } from "../generated/types/templates/ContractLockupLinear/SablierV2Comptroller";
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
        "[SABLIER] Compotroller hasn't been properly registered or isn't compliant: {}",
        [id],
      );
    } else {
      ComptrollerTemplate.create(address);
    }

    entity.address = address;
    entity.admin = admin.value;
    entity.flashFee = flashFee.value;
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
