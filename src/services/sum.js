import { traverse } from './traverse';
import { Const } from '../Applicative/Const';
import { curry } from '../helpers';

const _sum = (optic, ds) => traverse({...Const, ap: (l, r) => l + r, of: (_) => 0})(x => x)(optic)(ds);

export const sum = curry(_sum);
