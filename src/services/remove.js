import { traverse } from "./traverse";
import { Identity } from "../Applicative/Identity";
import { curry } from "../helpers";

const _remove = (optic, ds) => traverse(Identity)(x => undefined)(optic)(ds);

export const remove = curry(_remove);
