export type Mutable<T> = { -readonly [K in keyof T]: T[K] };
export type Address = string;

export type * from "./remap";
