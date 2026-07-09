---
name: Repo structure
description: Key structural facts about the Abide monorepo layout and package naming
---

The shared library packages live in `packages/` (NOT `lib/`). The `lib/` directory was renamed to `packages/` as part of the initial cleanup.

**Why:** User requested clean monorepo structure separating apps from shared packages.

**How to apply:** Any time you add a tsconfig reference or pnpm-workspace glob for a shared package, use `packages/` as the root. The workspace glob is `packages/*`. Do NOT use `lib/*`.

Key package locations:
- `packages/db` → `@workspace/db`
- `packages/api-spec` → `@workspace/api-spec`
- `packages/api-client-react` → `@workspace/api-client-react`
- `packages/api-zod` → `@workspace/api-zod`

App locations (under `artifacts/`):
- `artifacts/faithconnect` → mobile Expo app
- `artifacts/admin` → admin dashboard (React+Vite)
- `artifacts/api-server` → Express 5 API server

orval.config.ts in packages/api-spec uses `path.resolve(root, "packages", ...)` — keep in sync if packages move.
