import {
  LockupV20Contract_TransferAdmin_handler as HandlerLinear_V20,
  LockupV20Contract_TransferAdmin_loader as LoaderLinear_V20,
  LockupV21Contract_TransferAdmin_handler as HandlerLinear_V21,
  LockupV21Contract_TransferAdmin_loader as LoaderLinear_V21,
} from "../../generated/src/Handlers.gen";

import type { TransferAdminHandler, TransferAdminLoader } from "../types";

import { generateContractIdFromEvent, initialize } from "../helpers";

function loader(input: TransferAdminLoader) {
  const { context, event } = input;
  const contractId = generateContractIdFromEvent(event);
  const watcherId = event.chainId.toString();

  context.Contract.load(contractId);
  context.Watcher.load(watcherId);
}

function handler(input: TransferAdminHandler) {
  const { context, event } = input;

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

LoaderLinear_V20(loader);
HandlerLinear_V20(handler);

LoaderLinear_V21(loader);
HandlerLinear_V21(handler);
