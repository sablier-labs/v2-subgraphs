import * as envioQueries from "./setup/queries-envio";
import * as theGraphQueries from "./setup/queries-the-graph";
import { Envio, TheGraph } from "./setup/networking";
import { cleanup } from "./setup/cleanup";
import { SKIP_CLEANUP } from "./setup/constants";

describe("Campaigns (Sepolia)", () => {
  //fails due to envio indexing error
  test("First 100 results before subgraphId are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 99999,
      chainId: 11155111,
    } as const;

    const received = cleanup.campaigns(
      await Envio(envioQueries.getCampaigns, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await TheGraph(theGraphQueries.getCampaigns, variables),
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

  test("Get campaignById results are the same", async () => {
    const variables = {
      airstreamId: "0x8ca71b0f22d74a0a2ec2d176a30b4c6a07c6587c-11155111",
    } as const;

    const received = cleanup.campaign(
      await Envio(envioQueries.getCampaignById, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaign(
      await TheGraph(theGraphQueries.getCampaignById, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    expect(received.actions).toEqual(expected.actions);
  });

  test("Get actions by airstream results are the same", async () => {
    const variables = {
      first: 100,
      airstreamId: "0x8ca71b0f22d74a0a2ec2d176a30b4c6a07c6587c-11155111",
      subgraphId: 99999,
      chainId: 11155111,
    } as const;

    const received = cleanup.actions(
      await Envio(envioQueries.getActions_ByCampaign, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.actions(
      await TheGraph(theGraphQueries.getActions_ByCampaign, variables),
      SKIP_CLEANUP,
      "TheGraph",
    );

    console.info(
      `Comparing ${received.actions.length}, ${expected.actions.length} results.`,
    );

    expect(received.actions.length).toBeGreaterThan(0);
    expect(received.actions.length).toEqual(expected.actions.length);
    expect(received.actions).toEqual(expected.actions);
  });

  //fails due to indexing error
  test("Get 100 campaigns by asset results are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 99999,
      chainId: 11155111,
      asset: "0x776b6fc2ed15d6bb5fc32e0c89de68683118c62a",
    } as const;

    const received = cleanup.campaigns(
      await Envio(envioQueries.getCampaigns_ByAsset, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await TheGraph(theGraphQueries.getCampaigns_ByAsset, variables),
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

  test("Get campaignsByIds results are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 99999,
      airstreamIds: [
        "0x8ca71b0f22d74a0a2ec2d176a30b4c6a07c6587c-11155111",
        "0xc65a07656d99766998ea3f32b242a51ed06079f4-11155111",
      ],
      chainId: 11155111,
    } as const;

    const received = cleanup.campaigns(
      await Envio(envioQueries.getCampaigns_ByIds, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await TheGraph(theGraphQueries.getCampaigns_ByIds, variables),
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

  test("Get campaignsByAdmin results are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 99999,
      admin: "0xf31b00e025584486f7c37cf0ae0073c97c12c634",
      chainId: 11155111,
    } as const;

    const received = cleanup.campaigns(
      await Envio(envioQueries.getCampaigns_ByAdmin, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await TheGraph(theGraphQueries.getCampaigns_ByAdmin, variables),
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

  test("Get getCampaigns_ByAdminByAsset results are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 99999,
      admin: "0xf31b00e025584486f7c37cf0ae0073c97c12c634",
      chainId: 11155111,
      asset: "0x776b6fc2ed15d6bb5fc32e0c89de68683118c62a",
    } as const;

    const received = cleanup.campaigns(
      await Envio(envioQueries.getCampaigns_ByAdminByAsset, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await TheGraph(theGraphQueries.getCampaigns_ByAdminByAsset, variables),
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

  test("Get getCampaigns_ByAdminByIds results are the same", async () => {
    const variables = {
      first: 100,
      skip: 0,
      subgraphId: 99999,
      admin: "0xf31b00e025584486f7c37cf0ae0073c97c12c634",
      chainId: 11155111,
      airstreamIds: [
        "0x2c86ca0c8b1d7c02d6a686eb1217987de13d73ec-11155111",
        "0x457ea894243ded4b36f529921e3516f26630be32-11155111",
      ],
    } as const;

    const received = cleanup.campaigns(
      await Envio(envioQueries.getCampaigns_ByAdminByIds, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.campaigns(
      await TheGraph(theGraphQueries.getCampaigns_ByAdminByIds, variables),
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
