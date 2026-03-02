# Architecture

## Core Modules

- `schema/`: DPP schema definitions
- `engine/`: canonicalization and hash
- `signer/`: local signing
- `verifier/`: local verification and chain sanity checks
- `examples/`: runnable demos

## Trust Boundaries

- Private keys stay in your environment.
- Signed objects include `proof`.
- Verification can run offline.

## Lifecycle Chain

Each object can reference `lifecycle.prevHash`.

- `sequence = 0` should have `prevHash = null`
- later objects should point to previous object hash

This enables immutable event linkage for one `id` lineage.
