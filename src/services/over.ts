import { traverse } from "./traverse";
import { Identity } from "../Applicative/Identity";
import { OpticPart, Morphism } from "../types";

export function over(optic: OpticPart | OpticPart[], x2y: Morphism<any, any>, ds: any): any {
    return traverse(Identity)(x2y)(optic)(ds);
}