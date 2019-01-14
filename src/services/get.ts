import { traverse } from './traverse';
import { Const } from '../Applicative/Const';
import { OpticPart } from "../types";

export const get = (optic: OpticPart | OpticPart[], ds: any): any => traverse(Const)(x => x)(optic)(ds);