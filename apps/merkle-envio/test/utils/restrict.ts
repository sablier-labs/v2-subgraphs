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

export const restrict = {
  action: restrict_action,
  campaign: restrict_campaign,
  campaigns: restrict_campaigns,
  metadata: restrict_metadata,
};

export function restrict_action(source: unknown, skip: boolean): Action {
  const value = { ...(source as Action) };

  if (skip) {
    return value;
  }

  delete value.claimAmount;
  delete value.claimIndex;
  delete value.claimTokenId;
  delete value.clawbackAmount;
  delete value.from;

  return value;
}

export function restrict_campaign(source: unknown, skip: boolean): Campaign {
  const value = { ...(source as Campaign) };

  if (skip) {
    return value;
  }

  delete value.from;
  delete value.clawbackTime;

  if (value.actions?.length) {
    value.actions = value.actions.map((action) =>
      restrict_action(action, skip),
    );
  }

  return value;
}

export function restrict_campaigns(source: unknown, skip: boolean): Campaigns {
  const value = { ...(source as Campaigns) };

  if (skip) {
    return value;
  }

  value.campaigns = value.campaigns.map((campaign) =>
    restrict_campaign(campaign, skip),
  );

  return value;
}

export function restrict_metadata(source: unknown, skip: boolean): Metadata {
  const value = { ...(source as Metadata) };

  if (skip) {
    return value;
  }

  return {
    campaign: restrict_campaign(value.campaign, skip),
    actions: value.actions.map((action) => restrict_action(action, skip)),
  };
}
