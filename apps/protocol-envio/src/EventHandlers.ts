/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
    ERC20Contract_Approval_loader,
    ERC20Contract_Approval_handler,
    ERC20Contract_Transfer_loader,
    ERC20Contract_Transfer_handler,
} from "../generated/src/Handlers.gen";

import {
    ERC20_ApprovalEntity,
    ERC20_TransferEntity,
EventsSummaryEntity
} from "./src/Types.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
    eRC20_ApprovalCount: BigInt(0),
    eRC20_TransferCount: BigInt(0),
};

    ERC20Contract_Approval_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    ERC20Contract_Approval_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    eRC20_ApprovalCount: currentSummaryEntity.eRC20_ApprovalCount + BigInt(1),
  };

  const eRC20_ApprovalEntity: ERC20_ApprovalEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      owner: event.params.owner      ,
      spender: event.params.spender      ,
      amount: event.params.amount      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.ERC20_Approval.set(eRC20_ApprovalEntity);
});
    ERC20Contract_Transfer_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    ERC20Contract_Transfer_handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    eRC20_TransferCount: currentSummaryEntity.eRC20_TransferCount + BigInt(1),
  };

  const eRC20_TransferEntity: ERC20_TransferEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      from: event.params.from      ,
      to: event.params.to      ,
      amount: event.params.amount      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.ERC20_Transfer.set(eRC20_TransferEntity);
});
