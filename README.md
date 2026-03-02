# RedRock OpenDPP Core

A self-hosted, embeddable **DPP Data Object Engine**:
- Schema-first
- Canonicalize → Hash → Sign → Verify
- No central server dependency
- Designed for EU-trust: auditable & replaceable

## Packages / Modules
- `schema/`   DPP JSON Schema (versioned)
- `engine/`   canonicalize + hash
- `signer/`   local signing
- `verifier/` local verification
- `qr/`       QR payload helpers

## Status
MVP: minimal versioned object + local sign/verify.
