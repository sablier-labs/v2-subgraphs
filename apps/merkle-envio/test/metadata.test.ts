import { Envio, TheGraph } from "./setup/networking";
import { cleanup } from "./setup/cleanup";
import { SKIP_CLEANUP } from "./setup/constants";
import * as envioQueries from "./setup/queries-envio";
import * as theGraphQueries from "./setup/queries-the-graph";

describe("Campaign  0x9c...6531 (Sepolia)", () => {
  test("Metadata results are the same", async () => {
    const variables = {
      campaignId: "0x9cfb590f179acdc6225bb356c36c223dcb5c6531-11155111",
      campaignIdClone: "0x9cfb590f179acdc6225bb356c36c223dcb5c6531-11155111",
      dayFrom: 1,
      dayTo: 7,
    } as const;

    const received = cleanup.metadata(
      await Envio(envioQueries.getMetadata_ByCampaign, variables),
      SKIP_CLEANUP,
      "Envio",
    );

    const expected = cleanup.metadata(
      await TheGraph(theGraphQueries.getMetadata_ByCampaign, variables),
      SKIP_CLEANUP,
      "TheGraph",
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
