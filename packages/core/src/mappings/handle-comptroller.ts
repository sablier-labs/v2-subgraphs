import { dataSource } from "@graphprotocol/graph-ts";
import {
  ToggleFlashAsset as EventSetFlashAsset,
  SetFlashFee as EventSetFlashFee,
  SetProtocolFee as EventSetProtocolFee,
  TransferAdmin as EventTransferAdmin,
} from "../generated/types/templates/ContractComptroller/SablierV2Comptroller";
import {
  getOrCreateComptroller,
  getOrCreateComptrollerFlashAsset,
  getOrCreateComptrollerProtocolFee,
} from "../helpers";

export function handleComptrollerFlashAsset(event: EventSetFlashAsset): void {
  let comptrollerAddress = dataSource.address();
  let assetAddress = event.params.asset;

  let entity = getOrCreateComptrollerFlashAsset(
    comptrollerAddress,
    assetAddress,
  );

  entity.enabled = event.params.newFlag;
  entity.save();
}

export function handleComptrollerFlashFee(event: EventSetFlashFee): void {
  let comptrollerAddress = dataSource.address();
  let comptroller = getOrCreateComptroller(comptrollerAddress);

  comptroller.flashFee = event.params.newFlashFee;
  comptroller.save();
}

export function handleComptrollerProtocolFee(event: EventSetProtocolFee): void {
  let comptrollerAddress = dataSource.address();
  let assetAddress = event.params.asset;

  let entity = getOrCreateComptrollerProtocolFee(
    comptrollerAddress,
    assetAddress,
  );

  entity.amount = event.params.newProtocolFee;
  entity.save();
}

export function handleComptrollerTransferAdmin(
  event: EventTransferAdmin,
): void {
  let comptrollerAddress = dataSource.address();
  let comptroller = getOrCreateComptroller(comptrollerAddress);

  comptroller.admin = event.params.newAdmin;
  comptroller.save();
}
