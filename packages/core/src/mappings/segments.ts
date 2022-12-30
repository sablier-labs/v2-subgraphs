import { BigInt, log } from "@graphprotocol/graph-ts";
import { Segment, Stream } from "../generated/types/schema";
import { CreateProStream as EventCreateProStream } from "../generated/types/templates/ContractPro/SablierV2Pro";
import { zero } from "../constants";

export class SegmentInput {
  amount: BigInt;
  exponent: BigInt;
  milestone: BigInt;

  constructor(amount: BigInt, exponent: BigInt, milestone: BigInt) {
    this.amount = amount;
    this.exponent = exponent;
    this.milestone = milestone;
  }
}

export function createSegment(
  id: string,
  streamed: BigInt,
  last: SegmentInput,
  current: SegmentInput,
): Segment {
  let segment = new Segment(id);
  segment.amount = current.amount;
  segment.exponent = current.exponent;
  segment.milestone = current.milestone;

  segment.startTime = last.milestone;
  segment.endTime = current.milestone;

  segment.startAmount = streamed;
  segment.endAmount = streamed.plus(current.amount);

  return segment;
}

export function createSegments(
  stream: Stream,
  event: EventCreateProStream,
): Stream {
  let a = event.params.segmentAmounts;
  let e = event.params.segmentExponents;
  let m = event.params.segmentMilestones;

  if (a.length != e.length || a.length != m.length) {
    log.error(
      "[SABLIER] Segment data arrays for stream {} are of different sizes.",
      [stream.id],
    );
  }

  let streamed = zero;
  let length = a.length;
  let inputs: SegmentInput[] = [new SegmentInput(zero, zero, stream.startTime)];

  for (let i = 0; i < length; i++) {
    inputs.push(new SegmentInput(a[i], e[i], m[i]));
  }

  for (let i = 1; i < length; i++) {
    let id = stream.id.concat("-").concat(i.toString());
    let segment: Segment = createSegment(
      id,
      streamed,
      inputs[i - 1],
      inputs[i],
    );

    segment.stream = stream.id;
    segment.save();

    streamed = streamed.plus(inputs[i].amount);
  }

  return stream;
}
