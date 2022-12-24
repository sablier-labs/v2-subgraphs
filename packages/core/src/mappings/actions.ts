import { CreateLinearStream } from "../generated/types/templates/Linear/SablierV2Linear";
import { getOrCreateStream } from "../helpers";

export function handleCreateLinear(event: CreateLinearStream): void {
  let entity = getOrCreateStream(event);
  entity.save();
}
