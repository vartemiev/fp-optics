import { AnyOptic } from "../types";

export const insert = (idx: number): AnyOptic => F => x2yF => ds =>
    ds instanceof Array ?
        F.map(y =>
                y instanceof Array ?
                    [...ds.slice(0, idx), ...y, ...ds.slice(idx)] :
                    [...ds.slice(0, idx), y, ...ds.slice(idx)],
            x2yF(ds[idx])
        ) :
        F.of(ds);