export const when = cond => F => x2yF => (x, key) =>
    cond(x, key) ? x2yF(x, key) : F.of(x);