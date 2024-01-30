import { gql } from "graphql-request";
import * as F from "./utils/fragments";
import { Envio, TheGraph } from "./utils/networking";
import { cleanup } from "./utils/cleanup";
import { SKIP_CLEANUP } from "./utils/constants";

const getMetadata_ByCampaign_Envio = gql/* GraphQL */ `
  query getMetadata_ByCampaign(
    $campaignId: String!
    $campaignIdClone: String!
    $dayFrom: numeric!
    $dayTo: numeric!
  ) {
    Campaign(where: { id: { _eq: $campaignId } }) {
      id
      assetObject {
        ...AssetFragment
      }
      activities(
        limit: 7
        where: { _and: [{ day: { _gte: $dayFrom, _lte: $dayTo } }] }
      ) {
        ...ActivityFragment
      }
      actions(limit: 5, order_by: { subgraphId: desc }) {
        ...ActionFragment
      }
    }
    Action(
      limit: 10
      order_by: { subgraphId: desc }
      where: {
        _and: [
          { campaign: { _eq: $campaignIdClone } }
          { category: { _eq: "Claim" } }
        ]
      }
    ) {
      ...ActionFragment
    }
  }
  ${F.CampaignFragment_Envio}
  ${F.ActionFragment_Envio}
  ${F.ActivityFragment_Envio}
  ${F.AssetFragment_Envio}
  ${F.FactoryFragment_Envio}
`;

const getMetadata_ByCampaign_TheGraph = gql/* GraphQL */ `
  query getMetadata_ByCampaign(
    $campaignId: ID!
    $campaignIdClone: String!
    $dayFrom: BigInt!
    $dayTo: BigInt!
  ) {
    campaign(id: $campaignId) {
      id
      asset {
        ...AssetFragment
      }
      activities(first: 7, where: { day_gte: $dayFrom, day_lte: $dayTo }) {
        ...ActivityFragment
      }
      actions(first: 5, orderBy: subgraphId, orderDirection: desc) {
        ...ActionFragment
      }
    }
    actions(
      first: 10
      orderBy: subgraphId
      orderDirection: desc
      where: { campaign: $campaignIdClone, category: Claim }
    ) {
      ...ActionFragment
    }
  }

  ${F.CampaignFragment_TheGraph}
  ${F.ActionFragment_TheGraph}
  ${F.ActivityFragment_TheGraph}
  ${F.AssetFragment_TheGraph}
  ${F.FactoryFragment_TheGraph}
`;

describe("Campaign  0x9c...6531 (Sepolia)", () => {
  test("Metadata results are the same", async () => {
    const variables = {
      campaignId: "0x9cfb590f179acdc6225bb356c36c223dcb5c6531-11155111",
      campaignIdClone: "0x9cfb590f179acdc6225bb356c36c223dcb5c6531-11155111",
      dayFrom: 1,
      dayTo: 7,
    } as const;

    const received = cleanup.metadata(
      await Envio(getMetadata_ByCampaign_Envio, variables),
      SKIP_CLEANUP,
    );

    const expected = cleanup.metadata(
      await TheGraph(getMetadata_ByCampaign_TheGraph, variables),
      SKIP_CLEANUP,
    );

    expect({
      actions: received.actions,
      campaign: received.campaign,
    }).toEqual({
      actions: expected.actions,
      campaign: expected.campaign,
    });
  });
});
