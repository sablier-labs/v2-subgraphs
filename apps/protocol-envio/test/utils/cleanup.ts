/**
 * The fields specifically mentioned by these types are most likely with issues.
 * Keep an eye on them.
 */

export type Action = object & {
  from: string | undefined;
};

export type Stream = object & {
  from: string | undefined;
  actions?: Action[];
};

export type Streams = { streams: Stream[] };

export const cleanup = {
  action: cleanup_action,
  stream: cleanup_stream,
  streams: cleanup_streams,
};

export function cleanup_action(source: unknown, skip: boolean): Action {
  const value = { ...(source as Action) };

  if (skip) {
    return value;
  }

  delete value.from;

  return value;
}

export function cleanup_stream(source: unknown, skip: boolean): Stream {
  const value = { ...(source as Stream) };

  if (skip) {
    return value;
  }

  delete value.from;

  if (value.actions?.length) {
    value.actions = value.actions.map((action) => cleanup_action(action, skip));
  }

  return value;
}

export function cleanup_streams(source: unknown, skip: boolean): Streams {
  const value = { ...(source as Streams) };

  if (skip) {
    return value;
  }

  value.streams = value.streams.map((stream) => cleanup_stream(stream, skip));

  return value;
}
