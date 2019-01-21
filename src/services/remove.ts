import { traverse } from "./traverse";
import { Identity } from "../Applicative/Identity";
import { OpticPart } from "../types";

export function remove(optic: OpticPart | OpticPart[], ds: any): any {
    return traverse(Identity)(x => undefined)(optic)(ds);
}
