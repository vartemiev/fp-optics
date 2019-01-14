import { traverse } from "./traverse";
import { Identity } from "../Applicative/Identity";
import { OpticPart } from "../types";

export const set = (optic: OpticPart | OpticPart[], value: any, ds: any): any =>
    traverse(Identity)(x => value)(optic)(ds);