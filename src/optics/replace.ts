import { AnyOptic } from "../types";

const isEqual = (a: any, b: any): boolean => JSON.stringify(a) === JSON.stringify(b);

export const replace = (_in: any, _out: any): AnyOptic => F => x2yF => x =>
    isEqual(x, _in) ?
        F.of(_out) :
        F.map(y => {
            return isEqual(y, _out) ? _in : y
        }, x2yF(x));