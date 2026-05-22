# Architecture

## Overview
Two-app monorepo: a Vite React client (port 5173) proxied to an Express API server (port 3001), backed by a PostgreSQL database.

## Folder Structure

```
root/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # Reusable UI components
│       │   ├── BrandCard/   # Card with cascading dropdowns
│       │   ├── Pagination/  # Page navigation
│       │   └── ui/          # Generic primitives (Dropdown, Spinner, Error)
│       ├── hooks/           # Data fetching hooks (useBrands)
│       ├── pages/           # Route-level components (HomePage)
│       ├── services/        # All fetch calls (brandService)
│       ├── types/           # Shared TypeScript interfaces
│       └── utils/           # Pure utility functions (formatters)
│
└── server/                  # Express API
    └── src/
        ├── controllers/     # HTTP layer — req/res only
        ├── services/        # Business logic, data transformation
        ├── repositories/    # SQL queries — data access only
        ├── routes/          # URL → controller binding
        ├── db/              # pg Pool singleton
        ├── middleware/      # Global error handler
        └── types/           # Shared TypeScript interfaces
```

## MVC Request Flow

```
GET /api/brands?page=1
  → brandRoutes
  → brandController.getBrands()     — parses + validates query params
    → brandService.getBrands()      — calculates totalPages
      → brandRepository.findBrandsPaginated()   — SQL: SELECT brand, MIN/MAX price GROUP BY brand
      → brandRepository.countBrands()           — SQL: COUNT(DISTINCT brand)
  → res.json({ data: { brands, total, page, totalPages } })
```

## API Design

```
GET /api/brands?page=1&limit=12
  Response: { data: { brands: Brand[], total, page, totalPages } }

GET /api/brands/:brand/options
  Response: { data: { lengths: number[], widthsByLength: Record<string, number[]> } }

GET /api/brands/:brand/sku?length=X&width=Y
  Response: { data: { sku: string, price: number } }

Error (all routes):
  { error: string } + HTTP status code
```

## Frontend Data Flow

```
HomePage mounts
  └── useBrands(page) → GET /api/brands?page=N
        └── renders 12 × BrandCard + Pagination

BrandCard mounts
  └── useEffect → GET /api/brands/:brand/options
        └── stores { lengths, widthsByLength } in local state

User selects Length
  └── resets selectedWidth + skuResult
  └── computes availableWidths from widthsByLength[length] — no API call

User selects Width
  └── GET /api/brands/:brand/sku?length=X&width=Y
        └── displays SKU + price

Page change
  └── useBrands refires → all card state resets naturally
```

## Key Design Decision: `/options` Prefetch

Each card fetches its complete `widthsByLength` map on mount rather than making an API call per length selection. This means:
- 1 fetch per card on mount (not 1 + N per user interaction)
- Width cascade filtering happens client-side with zero latency
- Simpler frontend state — no loading spinner needed between length/width selection
