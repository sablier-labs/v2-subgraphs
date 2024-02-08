import { Envio, TheGraph } from "./setup/networking";
import { cleanup } from "./setup/cleanup";
import { SKIP_CLEANUP } from "./setup/constants";
import * as envioQueries from "./setup/queries-envio";
import * as theGraphQueries from "./setup/queries-the-graph";

describe("Streams (Sepolia)", () => {
  test("First 100 results before subgraphId are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams, variables),
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

  test("First 100 results from subgraph creation", async () => {
    const variables = {
      first: 100,
      skip: 0,
      chainId: 11155111,
      subgraphId: 9999999,
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_Asc, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_Asc, variables),
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
      await Envio(
        envioQueries.getStreams_BySenderByRecipientByIdsByToken,
        variables,
      ),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_BySenderByRecipientByIdsByToken,
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
        envioQueries.getStreams_BySender_Or_ByRecipient_Or_ByToken,
        variables,
      ),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_BySender_Or_ByRecipient_Or_ByToken,
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

  test("Filter by sender and recipient and ids yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
      recipient: "0xf31b00e025584486f7c37cf0ae0073c97c12c634".toLowerCase(),
      sender: "0xf976aF93B0A5A9F55A7f285a3B5355B8575Eb5bc".toLowerCase(),
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
      await Envio(envioQueries.getStreams_BySenderByRecipientByIds, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_BySenderByRecipientByIds,
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

  test("Filter by sender and ids and token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
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
      await Envio(envioQueries.getStreams_BySenderByIdsByToken, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_BySenderByIdsByToken,
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

  test("Filter by recipient and ids and token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
      recipient: "0xf31b00e025584486f7c37cf0ae0073c97c12c634".toLowerCase(),
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
      await Envio(envioQueries.getStreams_ByRecipientByIdsByToken, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_ByRecipientByIdsByToken,
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

  test("Filter by sender and recipient and token yields the same results", async () => {
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
        envioQueries.getStreams_BySenderByRecipientByToken,
        variables,
      ),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_BySenderByRecipientByToken,
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

  test("Filter recipient and ids yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
      recipient: "0xf31b00e025584486f7c37cf0ae0073c97c12c634".toLowerCase(),
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
      await Envio(envioQueries.getStreams_ByRecipientByIds, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_ByRecipientByIds, variables),
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

  test("Filter by sender and ids yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
      sender: "0xf976aF93B0A5A9F55A7f285a3B5355B8575Eb5bc".toLowerCase(),
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
      await Envio(envioQueries.getStreams_BySenderByIds, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_BySenderByIds, variables),
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

  test("Filter by sender and recipient yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
      recipient: "0xf31b00e025584486f7c37cf0ae0073c97c12c634".toLowerCase(),
      sender: "0xf976aF93B0A5A9F55A7f285a3B5355B8575Eb5bc".toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_BySenderByRecipient, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_BySenderByRecipient, variables),
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

  test("Filter by ids and token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
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
      await Envio(envioQueries.getStreams_ByIdsByToken, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_ByIdsByToken, variables),
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

  test("Filter by recipient and token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
      recipient: "0xf31b00e025584486f7c37cf0ae0073c97c12c634".toLowerCase(),
      token: "0x776b6fc2ed15d6bb5fc32e0c89de68683118c62a".toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_ByRecipientByToken, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_ByRecipientByToken, variables),
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

  test("Filter by sender and token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
      sender: "0xf976aF93B0A5A9F55A7f285a3B5355B8575Eb5bc".toLowerCase(),
      token: "0x776b6fc2ed15d6bb5fc32e0c89de68683118c62a".toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_BySenderByToken, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_BySenderByToken, variables),
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

  test("Filter by sender or recipient yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
      recipient: "0xf31b00e025584486f7c37cf0ae0073c97c12c634".toLowerCase(),
      sender: "0xf976aF93B0A5A9F55A7f285a3B5355B8575Eb5bc".toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_BySender_Or_ByRecipient, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(
        theGraphQueries.getStreams_BySender_Or_ByRecipient,
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

  test("Filter by sender yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
      sender: "0xf976aF93B0A5A9F55A7f285a3B5355B8575Eb5bc".toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_BySender, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_BySender, variables),
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

  test("Filter by recipient yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
      recipient: "0xf31b00e025584486f7c37cf0ae0073c97c12c634".toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_ByRecipient, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_ByRecipient, variables),
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

  test("Filter by ids yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
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
      await Envio(envioQueries.getStreams_ByIds, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_ByIds, variables),
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

  test("Filter by token yields the same results", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 999999,
      chainId: 11155111,
      token: "0x776b6fc2ed15d6bb5fc32e0c89de68683118c62a".toLowerCase(),
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreams_ByToken, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreams_ByToken, variables),
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

  test("First 29 subgraph aliases after the 1000 mark (asc)", async () => {
    const variables = {
      first: 29,
      skip: 1300,
      chainId: 11155111,
    } as const;

    const received = cleanup.streams(
      await Envio(envioQueries.getStreamAliases_Asc, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.streams(
      await TheGraph(theGraphQueries.getStreamAliases_Asc, variables),
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

  test("All entries are the same (asc)", async () => {
    const received = { streams: [] } as ReturnType<typeof cleanup.streams>;
    const expected = { streams: [] } as ReturnType<typeof cleanup.streams>;

    const variables = {
      first: 1000,
      skip: 0,
      chainId: 11155111,
    };

    let done = false;

    while (!done) {
      const received_slice = cleanup.streams(
        await Envio(envioQueries.getStreams_Asc, variables),
        SKIP_CLEANUP,
        "Envio",
      );

      const expected_slice = cleanup.streams(
        await TheGraph(theGraphQueries.getStreams_Asc, variables),
        SKIP_CLEANUP,
        "TheGraph",
      );

      received.streams.push(...received_slice.streams);
      expected.streams.push(...expected_slice.streams);

      if (
        received_slice.streams.length < variables.first &&
        expected_slice.streams.length < variables.first
      ) {
        done = true;
      } else {
        variables.skip = variables.skip + variables.first;
      }
    }

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });

  test("All alias entries are the same (asc)", async () => {
    const received = { streams: [] } as ReturnType<typeof cleanup.streams>;
    const expected = { streams: [] } as ReturnType<typeof cleanup.streams>;

    const variables = {
      first: 1000,
      skip: 0,
      chainId: 11155111,
    };

    let done = false;

    while (!done) {
      const received_slice = cleanup.streams(
        await Envio(envioQueries.getStreamAliases_Asc, variables),
        SKIP_CLEANUP,
        "Envio",
      );

      const expected_slice = cleanup.streams(
        await TheGraph(theGraphQueries.getStreamAliases_Asc, variables),
        SKIP_CLEANUP,
        "TheGraph",
      );

      received.streams.push(...received_slice.streams);
      expected.streams.push(...expected_slice.streams);

      if (
        received_slice.streams.length < variables.first &&
        expected_slice.streams.length < variables.first
      ) {
        done = true;
      } else {
        variables.skip = variables.skip + variables.first;
      }
    }

    console.info(
      `Comparing ${received.streams.length}, ${expected.streams.length} results.`,
    );

    expect(received.streams.length).toBeGreaterThan(0);
    expect(received.streams.length).toEqual(expected.streams.length);
    expect(received.streams).toEqual(expected.streams);
  });
});
