import { gql } from "graphql-request";
import * as F from "./utils/fragments";
import { Envio, TheGraph } from "./utils/networking";
import { restrict } from "./utils/restrict";

const getMetadata_ByAirstream_Envio = gql/* GraphQL */ `
  query getMetadata_ByAirstream(
    $airstreamId: String!
    $airstreamIdClone: String!
    $dayFrom: numeric!
    $dayTo: numeric!
  ) {
    Campaign(where: { id: { _eq: $airstreamId } }) {
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
          { campaign: { _eq: $airstreamIdClone } }
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

const getMetadata_ByAirstream_TheGraph = gql/* GraphQL */ `
  query getMetadata_ByAirstream(
    $airstreamId: ID!
    $airstreamIdClone: String!
    $dayFrom: BigInt!
    $dayTo: BigInt!
  ) {
    campaign(id: $airstreamId) {
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
      where: { campaign: $airstreamIdClone, category: Claim }
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

describe("Airstream  0x9c...6531 (Sepolia)", () => {
  test("Metadata results are the same", async () => {
    const variables = {
      airstreamId: "0x9cfb590f179acdc6225bb356c36c223dcb5c6531-11155111",
      airstreamIdClone: "0x9cfb590f179acdc6225bb356c36c223dcb5c6531-11155111",
      dayFrom: 1,
      dayTo: 7,
    } as const;

    const received = restrict.metadata(
      await Envio(getMetadata_ByAirstream_Envio, variables),
      true,
    );

    const expected = restrict.metadata(
      await TheGraph(getMetadata_ByAirstream_TheGraph, variables),
      true,
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
