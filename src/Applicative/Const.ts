import { IApplicative } from "../types";

export const Const: IApplicative = {
    of: x => x,
    ap: (fA, x) => x,
    map: (f, x) => x,
};