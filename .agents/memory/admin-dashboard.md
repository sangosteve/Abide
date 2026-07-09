---
name: Admin dashboard
description: Architecture and constraints for the Abide Admin React+Vite app
---

The admin dashboard is a **mock-data-only** frontend — no backend calls at build time.

**Why:** User specified "no backend integration required yet; use mock data for now."

**How to apply:** When adding new admin pages, define mock data in `artifacts/admin/src/data/`. Do not wire up API hooks until the user explicitly asks for backend integration. When that time comes, the hooks are in `@workspace/api-client-react`.

Key facts:
- Location: `artifacts/admin/` (package: `@workspace/admin`)
- Router: `wouter` with base path = `/admin/` (set via `import.meta.env.BASE_URL` in App.tsx)
- Routes are relative: `/dashboard`, `/users`, `/users/create`, etc. (NOT `/admin/dashboard`)
- Theme: dark navy background, purple accent — defined in `artifacts/admin/src/index.css` CSS vars
- Layout: persistent `AdminLayout` wrapper with `Sidebar` + `Topbar` used across all pages
- Pages built: /dashboard, /users, /users/create, /bible-studies, /bible-studies/create, /sermons, /sermons/create, /events, /events/create, /discussions
- Sidebar nav items that are placeholders (no page yet): Groups, Prayer Requests, Resources, Notifications, Analytics, Reports, Settings
