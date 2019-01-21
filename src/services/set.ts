import { traverse } from "./traverse";
import { Identity } from "../Applicative/Identity";
import { OpticPart } from "../types";

export function set(optic: OpticPart | OpticPart[], value: any, ds: any): any {
    return traverse(Identity)(x => value)(optic)(ds);
}
