import { gql } from "graphql-request";
import * as F from "./utils/fragments";
import { Envio, TheGraph } from "./utils/networking";
import { cleanup } from "./utils/cleanup";
import { SKIP_CLEANUP } from "./utils/constants";

const getCampaigns_Envio = gql/* GraphQL */ `
  query getCampaigns(
    $first: Int!
    $skip: Int!
    $subgraphId: numeric!
    $chainId: numeric!
    $asset: String # Required for compatibility
  ) {
    Campaign(
      limit: $first
      offset: $skip
      distinct_on: [subgraphId]
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

const getCampaigns_TheGraph = gql/* GraphQL */ `
  query getCampaigns($first: Int!, $skip: Int!, $subgraphId: BigInt!) {
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

describe("Campaigns (Sepolia)", () => {
  test("First 100 results before subgraphId are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 99999,
      chainId: 11155111,
    } as const;

    const received = cleanup.campaigns(
      await Envio(getCampaigns_Envio, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await TheGraph(getCampaigns_TheGraph, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.campaigns.length}, ${expected.campaigns.length} results.`,
    );

    expect(received.campaigns.length).toBeGreaterThan(0);
    expect(received.campaigns.length).toEqual(expected.campaigns.length);
    expect(received.campaigns).toEqual(expected.campaigns);
  });
});
