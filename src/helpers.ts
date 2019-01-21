export const curry = (fn) => {
    const curriedF = (...args) => {
        if (args.length >= fn.length) {
            return fn.call(this, ...args);
        }

        return curriedF.bind(this, ...args);
    };

    return curriedF;
};
