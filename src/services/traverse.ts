import { AnyOptic, IAlgebra, Algebra, MapF, OpticPart } from '../types';
import { at } from '../optics/at';


const compose2 = (outer: AnyOptic, inner: AnyOptic): AnyOptic => F => x2yF => outer(F)(inner(F)(x2yF));

const compose = (optics: AnyOptic[]): AnyOptic => optics.reduce(compose2);

const toOptic = (value: OpticPart): AnyOptic => {
    if (typeof value === 'string' || typeof value === 'number') {
        return at(value);
    }

    return value;
};


export const traverse = (F: IAlgebra) => (x2yF: MapF<any, any>) => (path: OpticPart | OpticPart[]): Algebra<any> => {
    const optic: AnyOptic = (path instanceof Array) ?
        compose(path.map(step => toOptic(step))) :
        toOptic(path);

    return optic(F)(x2yF);
};
