import { gql } from "graphql-request";
import * as F from "./utils/fragments";
import { Envio, TheGraph } from "./utils/networking";
import { cleanup } from "./utils/cleanup";
import { SKIP_CLEANUP } from "./utils/constants";

const getStreams_BySenderByRecipientByIdsByToken_Envio = gql/* GraphQL */ `
  query getStreams_BySenderByRecipientByIdsByToken(
    $first: Int!
    $skip: Int!
    $chainId: numeric!
    $sender: String!
    $recipient: String!
    $token: String!
    $streamIds: [String!]
    $subgraphId: numeric!
  ) {
    Stream(
      limit: $first
      offset: $skip
      distinct_on: [subgraphId]
      order_by: { subgraphId: desc }
      where: {
        _or: [
          {
            _and: [
              { asset: { _regex: $token } }
              { chainId: { _eq: $chainId } }
              { sender: { _eq: $sender } }
              { recipient: { _eq: $recipient } }
              { id: { _in: $streamIds } }
              { subgraphId: { _lt: $subgraphId } }
            ]
          }
          {
            _and: [
              { asset: { _regex: $token } }
              { chainId: { _eq: $chainId } }
              { proxender: { _eq: $sender } }
              { recipient: { _eq: $recipient } }
              { id: { _in: $streamIds } }
              { subgraphId: { _lt: $subgraphId } }
            ]
          }
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

const getStreams_BySenderByRecipientByIdsByToken_TheGraph = gql/* GraphQL */ `
  query getStreams_BySenderByRecipientByIdsByToken(
    $first: Int!
    $skip: Int!
    $chainId: Int!
    $sender: Bytes!
    $recipient: Bytes!
    $token: String!
    $streamIds: [String!]
    $subgraphId: BigInt!
  ) {
    streams(
      first: $first
      skip: $skip
      orderBy: subgraphId
      orderDirection: desc
      where: {
        or: [
          {
            and: [
              { asset: $token }
              { sender: $sender }
              { recipient: $recipient }
              { id_in: $streamIds }
              { subgraphId_lt: $subgraphId }
            ]
          }
          {
            and: [
              { asset: $token }
              { proxender: $sender }
              { recipient: $recipient }
              { id_in: $streamIds }
              { subgraphId_lt: $subgraphId }
            ]
          }
        ]
      }
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

describe("Streams Search (Sepolia)", () => {
  test("Filter by sender and recipient and ids and token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
      recipient: "0xf31b00e025584486f7c37cf0ae0073c97c12c634".toLowerCase(),
      sender: "0xf976aF93B0A5A9F55A7f285a3B5355B8575Eb5bc".toLowerCase(),
      token: "0x776b6fc2ed15d6bb5fc32e0c89de68683118c62a".toLowerCase(),
      streamIds: [
        "0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a-11155111-608",
        "0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a-11155111-609",
        "0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a-11155111-610",
        "0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a-11155111-611",
        "0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a-11155111-612",
        "0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a-11155111-613",
        "0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a-11155111-614",
        "0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a-11155111-70",
      ],
    } as const;

    const received = cleanup.streams(
      await Envio(getStreams_BySenderByRecipientByIdsByToken_Envio, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        getStreams_BySenderByRecipientByIdsByToken_TheGraph,
        variables,
      ),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });
});
