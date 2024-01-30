import { gql } from "graphql-request";
import * as F from "./utils/fragments";
import { Envio, TheGraph } from "./utils/networking";
import { cleanup } from "./utils/cleanup";
import { SKIP_CLEANUP } from "./utils/constants";

const getAirstreams_Envio = gql/* GraphQL */ `
  query getAirstreams(
    $first: Int!
    $skip: Int!
    $subgraphId: numeric!
    $chainId: numeric!
    $asset: String # Required for compatibility
  ) {
    Campaign(
      limit: $first
      offset: $skip
      order_by: { subgraphId: desc }
      where: {
        _and: [
          { subgraphId: { _lt: $subgraphId } }
          { chainId: { _eq: $chainId } }
        ]
      }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_Envio}
  ${F.AssetFragment_Envio}
  ${F.FactoryFragment_Envio}
`;

const getAirstreams_TheGraph = gql/* GraphQL */ `
  query getAirstreams($first: Int!, $skip: Int!, $subgraphId: BigInt!) {
    campaigns(
      first: $first
      skip: $skip
      orderBy: subgraphId
      orderDirection: desc
      where: { subgraphId_lt: $subgraphId }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_TheGraph}
  ${F.AssetFragment_TheGraph}
  ${F.FactoryFragment_TheGraph}
`;

describe("Airstreams (Sepolia)", () => {
  test("First 10 results before subgraphId are the same", async () => {
    const variables = {
      first: 1,
      skip: 0,
      subgraphId: 30,
      chainId: 11155111,
    } as const;

    const received = cleanup.campaigns(
      await Envio(getAirstreams_Envio, variables),
      SKIP_CLEANUP,
    );

    const expected = cleanup.campaigns(
      await TheGraph(getAirstreams_TheGraph, variables),
      SKIP_CLEANUP,
    );

    expect(received.campaigns).toEqual(expected.campaigns);
  });
});
