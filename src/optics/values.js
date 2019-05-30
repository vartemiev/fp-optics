export const values = F => x2yF => ds =>
    ds instanceof Object ?
        Object.keys(ds).reduce(
            (ysF, x) => {
                const mapF = F.map((ys) => y => y !== undefined ? {...ys, [x]: y} : ys, ysF);

                return F.ap(mapF, x2yF(ds[x], x));
            },
            F.of({})
        )
        :
        x2yF(ds);
