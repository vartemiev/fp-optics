import { traverse } from "./traverse";
import { Identity } from "../Applicative/Identity";
import { OpticPart } from "../types";

export const remove = (optic: OpticPart | OpticPart[], ds: any): any =>
    traverse(Identity)(x => undefined)(optic)(ds);