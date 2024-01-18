import {
  LockupV20Contract_TransferAdmin_handler as HandlerLinear_V20,
  LockupV20Contract_TransferAdmin_loader as LoaderLinear_V20,
  LockupV21Contract_TransferAdmin_handler as HandlerLinear_V21,
  LockupV21Contract_TransferAdmin_loader as LoaderLinear_V21,
} from "../src/Handlers.gen";

import type { TransferAdminHandler, TransferAdminLoader } from "../types";

import { generateContractIdFromEvent, getContract } from "../helpers";

function loader(input: TransferAdminLoader) {
  const { context, event } = input;
  const contractId = generateContractIdFromEvent(event);
  context.Contract.load(contractId);
}

async function handler(input: TransferAdminHandler) {
  const { context, event } = input;

  /** ------- Fetch -------- */

  let contract = getContract(event, event.srcAddress, context.Contract.get);

  contract = {
    ...contract,
    admin: event.params.newAdmin,
  };

  await context.Contract.set(contract);
}

LoaderLinear_V20(loader);
HandlerLinear_V20(handler);

LoaderLinear_V21(loader);
HandlerLinear_V21(handler);
