import { AnyOptic } from "../types";

export const when = (cond: (x: any, key?: number | string) => boolean): AnyOptic => F => x2yF => (x, key) =>
    cond(x, key) ? x2yF(x) : F.of(x);