# Integration

## Typical Integration Path

1. Collect product data from ERP, MES, or PLM.
2. Build an OpenDPP object with `specVersion`, `issuer`, `subject`, `lifecycle`, and `payload`.
3. Run canonicalize + hash.
4. Sign locally with Ed25519.
5. Verify before storage, handoff, or QR generation.

## 10-Line Usage

```js
import { signObject } from "../signer/sign.js";
import { verifyObject } from "../verifier/verify.js";

const signed = signObject(obj, privateKeyPem);
const result = verifyObject(signed);
if (!result.ok) throw new Error(result.reason);
```

## Deployment Model

- embedded in DPP SaaS backend
- embedded in ERP middleware
- run in offline environments
- no central server required
