import { OpticPart, Morphism } from "../types";

import { traverse } from "./traverse";
import { Identity } from "../Applicative/Identity";
import { curry } from "../helpers";

interface CurriedOver2 {
    (x2y: Morphism<any, any>, ds: any): any
    (x2y: Morphism<any, any>): (ds: any) => any
}

interface OverI {
    (optic: OpticPart | OpticPart[], x2y: Morphism<any, any>, ds: any): any
    (optic: OpticPart | OpticPart[], x2y: Morphism<any, any>): (ds: any) => any
    (optic: OpticPart | OpticPart[]): CurriedOver2
}

function _over(optic: OpticPart | OpticPart[], x2y: Morphism<any, any>, ds: any): any {
    return traverse(Identity)(x2y)(optic)(ds);
}

export const over: OverI = curry(_over);