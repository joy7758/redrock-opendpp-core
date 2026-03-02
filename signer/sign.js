import { createPublicKey, createPrivateKey, sign as nodeSign } from "node:crypto";
import { hashObject } from "../engine/hash.js";

function b64(buf) {
  return Buffer.from(buf).toString("base64");
}

export function signObject(obj, privateKeyPem) {
  const hash = hashObject(obj);
  const priv = createPrivateKey(privateKeyPem);
  const pub = createPublicKey(priv);

  const signature = nodeSign(null, Buffer.from(hash, "hex"), priv);

  const publicKeyDer = pub.export({ type: "spki", format: "der" }); // portable
  const proof = {
    alg: "Ed25519",
    publicKey: b64(publicKeyDer),
    signature: b64(signature),
    hash
  };

  return { ...obj, proof };
}
