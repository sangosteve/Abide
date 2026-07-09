# FaithConnect

A church-focused mobile app that helps congregations stay connected through sermons, events, Bible study, media, and community features.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- Mobile app: `artifacts/faithconnect/` (`@workspace/faithconnect`)
- Admin dashboard: `artifacts/admin/` (`@workspace/admin`) — React+Vite, mock data, dark navy/purple theme
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

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
