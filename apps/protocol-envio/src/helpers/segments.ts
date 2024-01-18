import type {
  Event,
  CreateDynamicArgs,
  Segment,
  Stream,
  Mutable,
} from "../types";

type Entity = Partial<Mutable<Segment>>;

class SegmentInput {
  amount: bigint;
  exponent: bigint;
  milestone: bigint;

  constructor(amount: bigint, exponent: bigint, milestone: bigint) {
    this.amount = amount;
    this.exponent = exponent;
    this.milestone = milestone;
  }
}

function createSegment(
  id: string,
  streamed: bigint,
  last: SegmentInput,
  current: SegmentInput,
) {
  const entity = {
    id,
    amount: current.amount,
    exponent: current.exponent,
    milestone: current.milestone,

    startTime: last.milestone,
    endTime: current.milestone,

    startAmount: streamed,
    endAmount: streamed + current.amount,
  } satisfies Entity;

  return entity;
}

export function createSegments(
  event: Event<CreateDynamicArgs>,
  stream: Pick<Stream, "id" | "startTime">,
) {
  let streamed = 0n;
  const inputs: SegmentInput[] = [new SegmentInput(0n, 0n, stream.startTime)];

  event.params.segments.forEach((item) => {
    inputs.push(new SegmentInput(item[0], item[1], item[2]));
  });

  const segments: Segment[] = [];

  for (let i = 1; i < inputs.length; i++) {
    const id = generateSegmentId(stream.id, i);
    const entity = createSegment(id, streamed, inputs[i - 1], inputs[i]);

    const segment: Segment = {
      ...entity,
      stream: stream.id,
      position: BigInt(i - 1),
    };

    segments.push(segment);
    streamed = streamed + inputs[i].amount;
  }

  return segments;
}

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateSegmentId(streamId: string, index: number) {
  return "".concat(streamId).concat("-").concat(index.toString());
}
