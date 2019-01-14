import { AnyOptic } from "../types";

const omitUndefObj = (xs: object): object => Object.keys(xs).reduce(
    (ys, key) => xs[key] === undefined ? ys : { ...ys, [key]: xs[key] },
    {}
);

const omitUndefArr = (xs: any[]): any[] => xs.filter(x => x !== undefined);

interface IArray {
    set: <T>(value: T, index: number, ds: T[]) => T[],
    get: <T>(index: number, ds: T[]) => T,
}

interface IObject {
    set: <T>(value: T, key: string, ds: object) => object,
    get: (key: string, ds: object) => any,
}

const aI: IArray = {
    set: (v, i, ds) => {
        const ys = ds instanceof Array ? [...ds] : [];

        ys[i] = v;
        return omitUndefArr(ys);
    },

    get: (i, ds) => ds instanceof Array ? ds[i] : undefined,
};

const oI: IObject = {
    set: (v, k, ds) => ds instanceof Object ?
        omitUndefObj({ ...ds, [k]: v }) :
        omitUndefObj({ [k]: v }),

    get: (key, ds) => ds instanceof Object ? ds[key] : undefined,
};

const atI = (I: IObject | IArray) => (key: string | number): AnyOptic => F => x2yF => ds => {
    const x = typeof key === 'string' ? (<IObject>I).get(key, ds) : (<IArray>I).get(key, ds);

    const yF = x2yF(x);

    return typeof key === 'string' ?
        F.map(y => (<IObject>I).set(y, key, ds), yF) :
        F.map(y => (<IArray>I).set(y, key, ds), yF);
};

export const at = (key: number | string) => typeof key === 'number' ? atI(aI)(key) : atI(oI)(key);
