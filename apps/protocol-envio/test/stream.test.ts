import { gql } from "graphql-request";
import * as F from "./utils/fragments";
import { Envio, TheGraph } from "./utils/networking";
import { cleanup } from "./utils/cleanup";
import { SKIP_CLEANUP } from "./utils/constants";

const getStreams_Envio = gql/* GraphQL */ `
  query getStreams(
    $first: Int!
    $skip: Int!
    $chainId: numeric!
    $subgraphId: numeric!
  ) {
    Stream(
      limit: $first
      offset: $skip
      order_by: { subgraphId: desc }
      where: {
        _and: [
          { chainId: { _eq: $chainId } }
          { subgraphId: { _lt: $subgraphId } }
        ]
      }
    ) {
      ...StreamFragment
    }
  }
  ${F.AssetFragment_Envio}
  ${F.BatchFragment_Envio}
  ${F.ContractFragment_Envio}
  ${F.SegmentFragment_Envio}
  ${F.StreamFragment_Envio}
`;

const getStreams_TheGraph = gql/* GraphQL */ `
  query getStreams(
    $first: Int!
    $skip: Int!
    $chainId: BigInt!
    $subgraphId: BigInt!
  ) {
    streams(
      first: $first
      skip: $skip
      orderBy: subgraphId
      orderDirection: desc
      where: { subgraphId_lt: $subgraphId }
    ) {
      ...StreamFragment
    }
  }
  ${F.AssetFragment_TheGraph}
  ${F.BatchFragment_TheGraph}
  ${F.ContractFragment_TheGraph}
  ${F.SegmentFragment_TheGraph}
  ${F.StreamFragment_TheGraph}
`;

describe("Streams (Sepolia)", () => {
  test("First 10 results before subgraphId are the same", async () => {
    const variables = {
      first: 100,
      skip: 20,
      subgraphId: 999999,
      chainId: 11155111,
    } as const;

    const received = cleanup.streams(
      await Envio(getStreams_Envio, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(getStreams_TheGraph, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });
});
