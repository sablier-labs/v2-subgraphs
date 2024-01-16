import type { EventLog } from "../../generated/src/Types.gen";

export let StreamVersion_V20 = "V20";
export let StreamVersion_V21 = "V21";

export type Event<Params extends object = {}> = EventLog<Params>;
