import { createPublicKey, verify as nodeVerify } from "node:crypto";
import { hashObject } from "../engine/hash.js";

function fromB64(s) {
  return Buffer.from(s, "base64");
}

export function verifyObject(obj) {
  if (!obj?.proof) return { ok: false, reason: "missing_proof" };

  const { proof } = obj;
  if (proof.alg !== "Ed25519") return { ok: false, reason: "unsupported_alg" };

  const recomputedHash = hashObject(obj);
  if (recomputedHash !== proof.hash) return { ok: false, reason: "hash_mismatch" };

  const pub = createPublicKey({ key: fromB64(proof.publicKey), format: "der", type: "spki" });
  const sigOk = nodeVerify(null, Buffer.from(proof.hash, "hex"), pub, fromB64(proof.signature));
  if (!sigOk) return { ok: false, reason: "bad_signature" };

  // Optional: lifecycle chain sanity
  if (obj.lifecycle?.sequence === 0 && obj.lifecycle?.prevHash != null) {
    return { ok: false, reason: "genesis_prevhash_should_be_null" };
  }

  return { ok: true };
}
