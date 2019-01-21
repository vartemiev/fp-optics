import { traverse } from './traverse';
import { Const } from '../Applicative/Const';
import { OpticPart } from "../types";

export function get(optic: OpticPart | OpticPart[], ds: any): any {
    return traverse(Const)(x => x)(optic)(ds);
}