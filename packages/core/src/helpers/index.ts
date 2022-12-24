import { Stream } from "../generated/types/schema";
import { CreateLinearStream } from "../generated/types/templates/Linear/SablierV2Linear";

export function getStreamById(id: string): Stream | null {
  return Stream.load(id);
}

export function getOrCreateStream(event: CreateLinearStream): Stream {
  let id = event.params.streamId.toHexString();
  let entity = getStreamById(id);

  if (entity == null) {
    entity = new Stream(id);
    entity.hash = event.transaction.hash;
    entity.source = event.address;
    entity.save();
  }

  return entity;
}
