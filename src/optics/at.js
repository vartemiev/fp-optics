
const omitUndefObj = (xs) => Object.keys(xs).reduce(
    (ys, key) => xs[key] === undefined ? ys : { ...ys, [key]: xs[key] },
    {}
);

const omitUndefArr = (xs) => xs.filter(x => x !== undefined);

const aI = {
    set: (v, i, ds) => {
        const ys = ds instanceof Array ? [...ds] : [];

        ys[i] = v;
        return omitUndefArr(ys);
    },

    get: (i, ds) => ds instanceof Array ? ds[i] : undefined,
};

const oI = {
    set: (v, k, ds) => ds instanceof Object ?
        omitUndefObj({ ...ds, [k]: v }) :
        omitUndefObj({ [k]: v }),

    get: (key, ds) => ds instanceof Object ? ds[key] : undefined,
};

const atI = I => key => F => x2yF => ds => {
    const x = typeof key === 'string' ? I.get(key, ds) : I.get(key, ds);

    const yF = x2yF(x);

    return typeof key === 'string' ?
        F.map(y => I.set(y, key, ds), yF) :
        F.map(y => I.set(y, key, ds), yF);
};

export const at = key => typeof key === 'number' ? atI(aI)(key) : atI(oI)(key);
