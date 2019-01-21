import { OpticPart } from "../types";

import { traverse } from "./traverse";
import { Identity } from "../Applicative/Identity";
import { curry } from "../helpers";

interface CurriedSet2 {
    (value: any, ds: any): any
    (value: any): (ds: any) => any
}

interface SetI {
    (optic: OpticPart | OpticPart[], value: any, ds: any): any
    (optic: OpticPart | OpticPart[], value: any): (ds: any) => any
    (optic: OpticPart | OpticPart[]): CurriedSet2
}

function _set(optic: OpticPart | OpticPart[], value: any, ds: any): any {
    return traverse(Identity)(x => value)(optic)(ds);
}

export const set: SetI = curry(_set);