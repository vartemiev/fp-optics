import { at } from '../optics/at';

const compose2 = (outer, inner) => F => x2yF => outer(F)(inner(F)(x2yF));

const compose = (optics) => optics.reduce(compose2);

const toOptic = (value) => {
    if (typeof value === 'string' || typeof value === 'number') {
        return at(value);
    }

    return value;
};

export const traverse = F => x2yF => path => {
    const optic = (path instanceof Array) ?
        compose(path.map(step => toOptic(step))) :
        toOptic(path);

    return optic(F)(x2yF);
};
