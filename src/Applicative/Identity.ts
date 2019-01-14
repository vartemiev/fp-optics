import { IApplicative } from "../types";

export const Identity: IApplicative = {
    ap: (fA, x) => fA(x),
    map: (f, x) => f(x),
    of: (x) => x,
};
