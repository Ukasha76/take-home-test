# Changelog

## Phase 0 — Project Setup
_2026-05-23_

- Initialized monorepo with `server/` (Express + TypeScript MVC) and `client/` (Vite + React + TypeScript + Tailwind)
- Configured MVC directory structure: controllers, services, repositories, routes, db, middleware, types
- Wrote all server skeleton files with stub implementations
- Configured Vite dev proxy: `/api` → `http://localhost:3001`
- Set up `.gitignore` and `server/.env.example`
- Created documentation: `CLAUDE.md`, `README.md`, `project-spec.md`, `docs/architecture.md`, `docs/project_status.md`
- Wrote shared TypeScript interfaces for `Brand`, `PaginatedBrands`, `BrandOptions`, `SkuResult`
- Wrote client skeleton: types, services, utils, hooks, pages, component stubs
