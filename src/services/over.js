import { traverse } from "./traverse";
import { Identity } from "../Applicative/Identity";
import { curry } from "../helpers";

const _over = (optic, x2y, ds) => traverse(Identity)(x2y)(optic)(ds);

export const over = curry(_over);