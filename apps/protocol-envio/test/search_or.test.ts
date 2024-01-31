import { gql } from "graphql-request";
import * as F from "./utils/fragments";
import { Envio, TheGraph } from "./utils/networking";
import { cleanup } from "./utils/cleanup";
import { SKIP_CLEANUP } from "./utils/constants";

const getStreams_BySender_Or_ByRecipient_Or_ByToken_Envio = gql/* GraphQL */ `
  query getStreams_BySender_Or_ByRecipient_Or_ByToken(
    $first: Int!
    $skip: Int!
    $chainId: numeric!
    $recipient: String!
    $sender: String!
    $token: String!
    $subgraphId: numeric!
  ) {
    Stream(
      limit: $first
      offset: $skip
      order_by: { subgraphId: desc }
      where: {
        _or: [
          {
            _and: [
              { chainId: { _eq: $chainId } }
              { sender: { _eq: $sender } }
              { subgraphId: { _lt: $subgraphId } }
            ]
          }
          {
            _and: [
              { chainId: { _eq: $chainId } }
              { proxender: { _eq: $sender } }
              { subgraphId: { _lt: $subgraphId } }
            ]
          }
          {
            _and: [
              { chainId: { _eq: $chainId } }
              { recipient: { _eq: $recipient } }
              { subgraphId: { _lt: $subgraphId } }
            ]
          }
          {
            _and: [
              { chainId: { _eq: $chainId } }
              { asset: { _iregex: $token } }
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

const getStreams_BySender_Or_ByRecipient_Or_ByToken_TheGraph = gql/* GraphQL */ `
  query getStreams_BySender_Or_ByRecipient_Or_ByToken(
    $first: Int!
    $skip: Int!
    $chainId: Int!
    $recipient: Bytes!
    $sender: Bytes!
    $token: String!
    $subgraphId: BigInt!
  ) {
    streams(
      first: $first
      skip: $skip
      orderBy: subgraphId
      orderDirection: desc
      where: {
        or: [
          { and: [{ sender: $sender }, { subgraphId_lt: $subgraphId }] }
          { and: [{ proxender: $sender }, { subgraphId_lt: $subgraphId }] }
          { and: [{ recipient: $recipient }, { subgraphId_lt: $subgraphId }] }
          { and: [{ asset: $token }, { subgraphId_lt: $subgraphId }] }
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
  test("Filter by sender or recipient or token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
      recipient: "0xf31b00e025584486f7c37cf0ae0073c97c12c634".toLowerCase(),
      sender: "0xf976aF93B0A5A9F55A7f285a3B5355B8575Eb5bc".toLowerCase(),
      token: "0x776b6fc2ed15d6bb5fc32e0c89de68683118c62a".toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(
        getStreams_BySender_Or_ByRecipient_Or_ByToken_Envio,
        variables,
      ),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        getStreams_BySender_Or_ByRecipient_Or_ByToken_TheGraph,
        variables,
      ),
      SKIP_CLEANUP,
      "TheGraph",
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });
});
