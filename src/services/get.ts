import { OpticPart } from '../types';

import { traverse } from './traverse';
import { Const } from '../Applicative/Const';
import { curry } from '../helpers';

interface GetI {
    (optic: OpticPart | OpticPart[], ds: any): any
    (optic: OpticPart | OpticPart[]): (ds: any) => any
}

function _get(optic: OpticPart | OpticPart[], ds: any): any {
    return traverse(Const)(x => x)(optic)(ds);
}

export const get: GetI = curry(_get);
