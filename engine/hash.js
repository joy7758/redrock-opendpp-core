import { createHash } from "node:crypto";
import { canonicalize } from "./canonicalize.js";

export function hashObject(obj) {
  const canon = canonicalize(obj);
  return createHash("sha256").update(canon).digest("hex");
}
