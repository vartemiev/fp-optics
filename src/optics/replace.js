const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const replace = (_in, _out) => F => x2yF => x =>
    isEqual(x, _in) ?
        F.of(_out) :
        F.map(y => {
            return isEqual(y, _out) ? _in : y
        }, x2yF(x));