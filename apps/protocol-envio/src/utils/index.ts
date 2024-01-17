import type { EventLog } from "../../generated/src/Types.gen";

export type Mutable<T> = { -readonly [K in keyof T]: T[K] };
export type Address = string;
export type Event<Params extends object = {}> = EventLog<Params>;
