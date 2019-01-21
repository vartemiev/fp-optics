import { OpticPart } from "../types";

import { traverse } from "./traverse";
import { Identity } from "../Applicative/Identity";
import { curry } from "../helpers";

interface RemoveI {
    (optic: OpticPart | OpticPart[], ds: any): any
    (optic: OpticPart | OpticPart[]): (ds: any) => any
}

function _remove(optic: OpticPart | OpticPart[], ds: any): any {
    return traverse(Identity)(x => undefined)(optic)(ds);
}

export const remove: RemoveI = curry(_remove);
