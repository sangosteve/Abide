# Abide

A church engagement platform built for modern congregations. **Abide** helps churches manage members, Bible studies, sermons, events, and community discussions — all in one place.

This monorepo contains two apps:

| App | Location | Purpose |
|-----|----------|---------|
| **Mobile** (Expo) | `artifacts/faithconnect/` | Member-facing iOS/Android app |
| **Admin** (React/Vite) | `artifacts/admin/` | Church staff admin dashboard |

---

## Repo Structure

```
/
├── artifacts/
│   ├── faithconnect/     # Expo React Native mobile app
│   ├── admin/            # React + Vite admin dashboard
│   └── api-server/       # Express 5 API server
├── packages/
│   ├── db/               # Drizzle ORM schema + PostgreSQL client
│   ├── api-spec/         # OpenAPI spec (source of truth for API contracts)
│   ├── api-client-react/ # Generated React Query hooks (from OpenAPI)
│   └── api-zod/          # Generated Zod schemas (from OpenAPI)
├── scripts/              # Workspace utility scripts
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [pnpm](https://pnpm.io/) 10+
- [Expo Go](https://expo.dev/go) app on your phone (for mobile development)
- PostgreSQL database (set `DATABASE_URL` env var)

---

## Install

```bash
pnpm install
```

---

## Running the Apps

### Admin Dashboard

```bash
pnpm admin
# or
cd artifacts/admin && pnpm dev
```

Opens the admin dashboard at `http://localhost:<PORT>/admin/`.

### Mobile App

**On Replit (managed workflow):**
The mobile app runs automatically via the configured Expo workflow.

**Locally (with Expo Go):**
```bash
pnpm mobile
# or
cd artifacts/faithconnect && pnpm start
```

Scan the QR code with [Expo Go](https://expo.dev/go) on your phone.

```bash
# Clear Metro cache
pnpm mobile:clear

# Use tunnel (for networks that block LAN connections)
pnpm mobile:tunnel
```

### API Server

```bash
pnpm --filter @workspace/api-server run dev
# or
cd artifacts/api-server && pnpm dev
```

Runs the API at `http://localhost:8080/api/`.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `SESSION_SECRET` | Yes | Secret for session signing |

---

## Development Commands

```bash
# Type-check everything
pnpm typecheck

# Build all packages
pnpm build

# Regenerate API hooks + Zod schemas from OpenAPI spec
pnpm --filter @workspace/api-spec run codegen

# Push DB schema changes (dev only)
pnpm --filter @workspace/db run push
```

---

## Mock Data

The admin dashboard currently uses mock data — no backend integration is required to run or develop the admin UI. All data is defined locally in `artifacts/admin/src/` and can be swapped for real API calls once the backend is wired up.

---

## Future Backend Integration

The API server (`artifacts/api-server/`) is built with Express 5 and is the intended backend for both the mobile app and admin dashboard. The integration path:

1. Define endpoints in `packages/api-spec/openapi.yaml`
2. Run codegen: `pnpm --filter @workspace/api-spec run codegen`
3. Use the generated hooks in the admin app (`@workspace/api-client-react`)
4. Implement routes in `artifacts/api-server/src/routes/`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | Expo 54, React Native, Expo Router |
| Admin | React 19, Vite, Tailwind CSS v4, Wouter |
| API | Express 5, TypeScript, esbuild |
| Database | PostgreSQL 16, Drizzle ORM |
| Validation | Zod v4, drizzle-zod |
| API Codegen | Orval (OpenAPI → React Query + Zod) |
| Package manager | pnpm workspaces |
