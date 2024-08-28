import type { registeredLoaderHandler as RegisteredLoaderHandler } from "../../generated/src/RegisteredEvents.gen";
import { EventLog } from "../../generated/src/Types.gen";

export type Event<Params extends object = {}> = EventLog<Params>;
export type Loader<
  T extends (_1: RegisteredLoaderHandler<object, unknown>) => void,
> = Parameters<Parameters<T>["0"]["loader"]>["0"];
export type Handler<
  Loaded,
  T extends (_1: RegisteredLoaderHandler<object, Loaded>) => void,
> = Parameters<Parameters<T>["0"]["handler"]>["0"];

export type Mutable<T> = { -readonly [K in keyof T]: T[K] };
export type Address = string;

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};
