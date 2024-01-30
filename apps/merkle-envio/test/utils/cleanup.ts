/**
 * The fields specifically mentioned by these types are most likely with issues.
 * Keep an eye on them.
 */

export type Action = object & {
  claimAmount: string | undefined;
  claimIndex: string | undefined;
  claimTokenId: string | undefined;
  clawbackAmount: string | undefined;
  from: string | undefined;
};

export type Campaign = object & {
  from: string | undefined;
  actions?: Action[];
  clawbackTime: string | undefined;
};

export type Campaigns = { campaigns: Campaign[] };
export type Metadata = { campaign: Campaign; actions: Action[] };

export const cleanup = {
  action: cleanup_action,
  campaign: cleanup_campaign,
  campaigns: cleanup_campaigns,
  metadata: cleanup_metadata,
};

export function cleanup_action(source: unknown, skip: boolean): Action {
  const value = { ...(source as Action) };

  if (skip) {
    return value;
  }

  delete value.from;

  return value;
}

export function cleanup_campaign(source: unknown, skip: boolean): Campaign {
  const value = { ...(source as Campaign) };

  if (skip) {
    return value;
  }

  delete value.from;

  if (value.actions?.length) {
    value.actions = value.actions.map((action) => cleanup_action(action, skip));
  }

  return value;
}

export function cleanup_campaigns(source: unknown, skip: boolean): Campaigns {
  const value = { ...(source as Campaigns) };

  if (skip) {
    return value;
  }

  value.campaigns = value.campaigns.map((campaign) =>
    cleanup_campaign(campaign, skip),
  );

  return value;
}

export function cleanup_metadata(source: unknown, skip: boolean): Metadata {
  const value = { ...(source as Metadata) };

  if (skip) {
    return value;
  }

  return {
    campaign: cleanup_campaign(value.campaign, skip),
    actions: value.actions.map((action) => cleanup_action(action, skip)),
  };
}
