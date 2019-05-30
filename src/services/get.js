import { traverse } from './traverse';
import { Const } from '../Applicative/Const';
import { curry } from '../helpers';

const _get = (optic, ds) => traverse(Const)(x => x)(optic)(ds);

export const get = curry(_get);
