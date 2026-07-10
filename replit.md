# FaithConnect

A church-focused mobile app that helps congregations stay connected through sermons, events, Bible study, media, and community features.

## Run & Operate

On Replit, the three services run as workflows (start/restart from the Workflows pane, not manually):

- `Admin Dashboard` — `pnpm --filter @workspace/admin run dev` (served at `/admin/`)
- `API Server` — `pnpm --filter @workspace/api-server run dev` (served at `/api`)
- `Mobile App` — `pnpm --filter @workspace/faithconnect run dev` (Expo)

Other commands:

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only); use `push-force` if it reports conflicts
- `pnpm --filter @workspace/scripts run seed` — seed the database with sample data
- Required env: `DATABASE_URL` — Postgres connection string (already configured)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- Mobile app: `artifacts/faithconnect/` (`@workspace/faithconnect`)
- Admin dashboard: `artifacts/admin/` (`@workspace/admin`) — React+Vite, wired to the live API, dark navy/purple theme
- API server: `artifacts/api-server/` (`@workspace/api-server`)
- Shared packages: `packages/` (db, api-spec, api-client-react, api-zod)
- DB schema: `packages/db/src/schema/index.ts`
- API contract: `packages/api-spec/openapi.yaml`
- Admin mock data: `artifacts/admin/src/data/`

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- This project was imported from GitHub with `.replit-artifact/artifact.toml` files already present under each `artifacts/*` folder, but they weren't registered as Replit artifacts in this repl (a fresh import doesn't carry over that server-side registration). Since re-running the artifact creation flow would require deleting the existing app directories, the three services are run as plain Replit workflows (`Admin Dashboard`, `API Server`, `Mobile App`) that mirror the ports/commands in each `artifact.toml`, instead of through the managed-artifact system.
- `artifacts/admin/src/App.tsx` referenced several page files that didn't exist in the imported repo (`users/edit`, `sermons/edit`, `events/edit`, `bible-studies/edit`, `bible-studies/manage`) — these were added to get the app compiling.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
