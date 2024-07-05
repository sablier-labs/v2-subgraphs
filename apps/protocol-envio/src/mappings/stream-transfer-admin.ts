import {
  LockupV20Contract_TransferAdmin_handler as HandlerLockup_V20,
  LockupV20Contract_TransferAdmin_loader as LoaderLockup_V20,
  LockupV21Contract_TransferAdmin_handler as HandlerLockup_V21,
  LockupV21Contract_TransferAdmin_loader as LoaderLockup_V21,
  LockupV22Contract_TransferAdmin_handler as HandlerLockup_V22,
  LockupV22Contract_TransferAdmin_loader as LoaderLockup_V22,
} from "../../generated/src/Handlers.gen";

import type { TransferAdminHandler, TransferAdminLoader } from "../types";

import { generateContractIdFromEvent, initialize } from "../helpers";
import { ADDRESS_ZERO } from "../constants";

function loader(input: TransferAdminLoader) {
  const { context, event } = input;
  const contractId = generateContractIdFromEvent(event);
  const watcherId = event.chainId.toString();

  context.Contract.load(contractId);
  context.Watcher.load(watcherId);
}

function handler(input: TransferAdminHandler) {
  const { context, event } = input;

  /**
   * As described in issue #18, we will first filter out
   * any `Transfer` events emitted by the initial mint transaction
   */

  if (event.params.oldAdmin.toLowerCase() === ADDRESS_ZERO.toLowerCase()) {
    return;
  }

  /** ------- Initialize -------- */

  let { contract, contracts, watcher } = initialize(
    event,
    context.Watcher.get,
    context.Contract.get,
  );

  /** ------- Process -------- */

  contract = {
    ...contract,
    admin: event.params.newAdmin,
  };

  if (contracts.length) {
    for (let i = 0; i < contracts.length; i++) {
      if (contracts[i].id === contract.id) {
        context.Contract.set(contract);
      }
      context.Contract.set(contracts[i]);
    }
  }

  context.Contract.set(contract);
  context.Watcher.set(watcher);
}

LoaderLockup_V20(loader);
HandlerLockup_V20(handler);

LoaderLockup_V21(loader);
HandlerLockup_V21(handler);

LoaderLockup_V22(loader);
HandlerLockup_V22(handler);
