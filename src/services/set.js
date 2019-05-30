import { traverse } from "./traverse";
import { Identity } from "../Applicative/Identity";
import { curry } from "../helpers";

const _set = (optic, value, ds) => traverse(Identity)(x => value)(optic)(ds);

export const set = curry(_set);