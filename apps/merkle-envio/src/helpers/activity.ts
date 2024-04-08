import type { Activity, Event, Mutable } from "../types";

type Entity = Partial<Mutable<Activity>>;

export function getActivity(
  event: Event,
  campaignId: string,
  loader: (id: string) => Activity | undefined,
) {
  const id = generateActivityId(event, campaignId);
  const loaded = loader(id);

  if (!loaded) {
    throw new Error("Missing activity instance");
  }

  return loaded;
}

export async function getActivity_async(
  event: Event,
  campaignId: string,
  loader: (id: string) => Promise<Activity | undefined>,
) {
  const id = generateActivityId(event, campaignId);
  const loaded = await loader(id);

  if (!loaded) {
    throw new Error("Missing activity instance");
  }

  return loaded;
}

export function getOrCreateActivity(
  event: Event,
  campaignId: string,
  loader: (id: string) => Activity | undefined,
) {
  const id = generateActivityId(event, campaignId);
  const loaded = loader(id);

  if (!loaded) {
    return createActivity(event, campaignId);
  }

  return loaded;
}

export async function getOrCreateActivity_async(
  event: Event,
  campaignId: string,
  loader: (id: string) => Promise<Activity | undefined>,
) {
  const id = generateActivityId(event, campaignId);
  const loaded = await loader(id);

  if (!loaded) {
    return createActivity(event, campaignId);
  }

  return loaded;
}

export function createActivity(event: Event, campaignId: string) {
  const timestamp = BigInt(event.blockTimestamp);
  const day = timestamp / (60n * 60n * 24n);

  const id = generateActivityId(event, campaignId);

  const entity = {
    id,
    day,
    campaign_id: campaignId,
    timestamp: BigInt(event.blockTimestamp),
    /** --------------- */
    amount: 0n,
    claims: 0n,
  } satisfies Entity;

  return entity;
}

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateActivityId(event: Event, campaignId: string) {
  const timestamp = BigInt(event.blockTimestamp);
  const day = timestamp / (60n * 60n * 24n);

  return ""
    .concat("activity")
    .concat("-")
    .concat(campaignId)
    .concat("-")
    .concat(day.toString());
}
