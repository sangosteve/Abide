---
name: Imported repo with unregistered artifact.toml files
description: What to do when a git-imported multi-artifact project has artifact.toml files on disk but listArtifacts() is empty
---

A project imported from GitHub can contain real `.replit-artifact/artifact.toml` files under `artifacts/*` (built/exported elsewhere) while this repl's internal artifact registry is empty (`listArtifacts()` returns `[]`). `createArtifact()` then fails with `ARTIFACT_DIR_EXISTS` since the target directories already have code, and there is no supported "adopt existing artifact.toml" callback.

**Why:** artifact registration is server-side/per-repl state, not derivable from the files themselves, so a fresh git import doesn't carry it over even though the on-disk config looks complete.

**How to apply:** don't try to force `createArtifact`. Instead register each service as a plain Replit workflow via `configureWorkflow`, reusing the exact `PORT`/`BASE_PATH`/run command from that artifact's `artifact.toml`. This gets the app running correctly, though tools that depend on true artifact registration (`presentArtifact`, the `Screenshot` tool) won't work until proper registration happens — flag this as a follow-up rather than a blocker.
