import { traverse } from './traverse';
import { Const } from '../Applicative/Const';
import { curry } from '../helpers';

const _collect = (optic, ds) => traverse({...Const, ap: (l, r) => [...l, ...r], of: (_) => []})(x => [x])(optic)(ds);

export const collect = curry(_collect);
