import { gql } from "graphql-request";
import * as F from "./utils/fragments";
import { Envio, TheGraph } from "./utils/networking";

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
      first: 10,
      skip: 0,
      subgraphId: 30,
      chainId: 11155111,
    } as const;

    type Result = { campaigns?: object[] };

    const received = (await Envio(getAirstreams_Envio, variables)) as Result;
    const expected = (await TheGraph(
      getAirstreams_TheGraph,
      variables,
    )) as Result;

    expect(received?.campaigns).toEqual(expected.campaigns);
  });
});
