import { generateKeyPairSync } from "node:crypto";
import { signObject } from "../signer/sign.js";
import { verifyObject } from "../verifier/verify.js";

const { privateKey } = generateKeyPairSync("ed25519");
const privateKeyPem = privateKey.export({ format: "pem", type: "pkcs8" });

const obj = {
  specVersion: "opendpp/1.0",
  id: "urn:uuid:demo-001",
  type: "battery",
  issuedAt: new Date().toISOString(),
  issuer: { name: "Demo Manufacturer", id: "EU:EORI:DEMO" },
  subject: { productId: "BAT-ABC-0001", batchId: "BATCH-2026-03" },
  lifecycle: { stage: "manufacture", sequence: 0, prevHash: null },
  payload: {
    // keep it minimal; providers extend
    massKg: 12.3,
    originCountry: "CN"
  }
};

const signed = signObject(obj, privateKeyPem);
const result = verifyObject(signed);

console.log("signed object:", JSON.stringify(signed, null, 2));
console.log("verify:", result);
process.exit(result.ok ? 0 : 1);
