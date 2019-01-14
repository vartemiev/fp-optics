import { AnyOptic } from '../types';

export const elems: AnyOptic = F => x2yF => ds =>
    ds instanceof Array ?
        ds.reduce(
            (ysF, x, i) => F.ap(F.map(ys => y => y !== undefined ? [...ys, y] : ys, ysF), x2yF(x, i)),
            F.of([])
        )
        :
        x2yF(ds);
