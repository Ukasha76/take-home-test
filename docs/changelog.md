# Changelog

## Phase 5 — UI Implementation
_2026-05-23_

- `BrandCard`: options fetched on mount with cancellation flag; `disabled={!options}` covers loading + error states cleanly
- Cascade: `availableWidths` computed from `widthsByLength[String(selectedLength)]`; length change resets width + sku + error
- Price display: shows price range until both dropdowns selected; replaced by `$price SKU` on resolve
- `LoadingSpinner` shown inline during options and SKU fetches
- `Pagination`: numbered buttons, ← → controls, `disabled` at boundaries, current page blue, returns null for ≤1 page

## Phase 4 — Frontend Foundation
_2026-05-23_

- Verified all types align with API response shapes
- `useBrands` hook confirmed: cancellation pattern, correct data extraction
- `BrandCard` stripped to clean Phase 4 skeleton — renders brand + price range, zero IDE warnings
- `Dropdown` ui component confirmed: controlled, disabled state, placeholder
- `Pagination` props interface confirmed correct for Phase 5
- TypeScript strict-mode: zero errors across all client files
- Production build clean: 24 modules, 6.62 kB Tailwind CSS bundle

## Phase 3 — API Implementation
_2026-05-23_

- `brandRepository`: 4 SQL queries — paginated brands with MIN/MAX price, COUNT(DISTINCT brand), DISTINCT length/width pairs ordered ASC, SKU lookup by brand+length+width
- `brandService`: parallel `Promise.all` for brands+count fetch; `widthsByLength` map built from sorted DB pairs; NUMERIC prices converted from pg string to number
- `brandController`: page/limit defaults + coercion; 400 on missing length/width; 404 on no SKU match
- Verified: 52 brands, 5 pages, correct cascade options, price as integer, error responses correct

## Phase 2 — Backend Foundation
_2026-05-23_

- Verified full MVC scaffold: controller → service → repository → routes wired correctly
- Added `try/catch` + `next(err)` to all controller stubs (error handler ready)
- Prefixed unused stub params with `_` — zero IDE diagnostic warnings
- TypeScript strict-mode: zero compilation errors
- All three route stubs confirmed returning `{"data":{}}` on live server

## Phase 1 — Database Connection
_2026-05-23_

- Installed PostgreSQL 15 locally (port 5432)
- Created `brand_cards` database
- Restored SQL dump — 948 SKUs across 52 brands loaded
- Created `server/.env` with `DATABASE_URL`
- Verified `pg` Pool connection via ts-node test query

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
