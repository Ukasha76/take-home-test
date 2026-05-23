https://github.com/user-attachments/assets/92e38898-017d-422e-9e0f-33ae8d9a962f

# Brand Cards Interface

A full-stack PERN application that displays paginated product brand cards with cascading dimension dropdowns. Selecting a length and width resolves to a specific SKU and its exact price.

---

## Spec Compliance

| Requirement | Status |
|---|---|
| Query `products` table, group by brand | Done |
| Each card represents one unique brand | Done |
| Card shows brand name + price range (`min – max`) before selection | Done |
| Length dropdown populated per brand (ascending) | Done |
| Width dropdown filtered by selected length — cascading | Done |
| Width disabled until length is chosen | Done |
| Both selected → display matched SKU + exact price | Done |
| 12 cards per page | Done |
| Pagination controls (prev, page numbers, next) | Done |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL — raw `pg` driver (no ORM) |
| Dev proxy | Vite `/api` → `http://localhost:8001` |

---

## Project Structure

```
├── client/                       # Vite React app (port 5173)
│   └── src/
│       ├── components/
│       │   ├── BrandCard/        # Pure renderer — delegates logic to useBrandCard
│       │   ├── Pagination/       # Prev / page numbers / next controls
│       │   └── ui/               # Dropdown, LoadingSpinner, ErrorMessage
│       ├── hooks/
│       │   ├── useBrands.ts      # Fetches paginated brand list
│       │   └── useBrandCard.ts   # Options + SKU fetch with race-condition guard
│       ├── pages/
│       │   └── HomePage.tsx
│       ├── services/
│       │   └── brandService.ts   # All API calls in one place
│       ├── types/                # Shared TypeScript interfaces
│       └── utils/
│           └── formatters.ts     # formatPrice / formatPriceRange
│
├── server/                       # Express API (port 8001)
│   └── src/
│       ├── controllers/
│       │   └── brandController.ts   # Input validation + request/response
│       ├── services/
│       │   └── brandService.ts      # Business logic + data transformation
│       ├── repositories/
│       │   └── brandRepository.ts   # All SQL — single source of truth
│       ├── middleware/
│       │   └── errorHandler.ts      # Centralised error handling
│       ├── db/
│       │   └── pool.ts              # pg Pool (reads DATABASE_URL from env)
│       ├── errors.ts                # AppError class (typed HTTP errors)
│       ├── routes/
│       └── app.ts / server.ts
│
├── docs/                         # Architecture + project status docs
├── perntesting_database.sql/     # PostgreSQL dump (948 SKUs, 52 brands)
└── README.md
```

---

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm

---

## Database Setup

**1. Create a database:**

```bash
createdb perntesting
```

**2. Restore the dump:**

```bash
psql -U <your_user> -d perntesting -f "perntesting_database.sql/perntesting_database.sql"
```

This creates the `products` table:

```sql
CREATE TABLE public.products (
    sku     character varying NOT NULL,
    brand   character varying NOT NULL,
    length  integer           NOT NULL,
    width   integer           NOT NULL,
    price   numeric(18,2)     NOT NULL,
    CONSTRAINT products_pk                        PRIMARY KEY (sku),
    CONSTRAINT products_brand_length_width_unique UNIQUE (brand, length, width)
);

CREATE INDEX idx_products_brand ON public.products USING btree (brand);
```

**948 rows across 52 brands.**

---

## Environment Setup

Create `server/.env` using the provided example:

```bash
cd server
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/perntesting
PORT=8001
CORS_ORIGIN=http://localhost:5173
```

> `.env` is gitignored. Never commit credentials.

---

## Running the App

**Terminal 1 — Server:**

```bash
cd server
npm install
npm run dev
```

Server starts at `http://localhost:8001`

**Terminal 2 — Client:**

```bash
cd client
npm install
npm run dev
```

Client starts at `http://localhost:5173`

---

## API Reference

All responses use a consistent envelope:

```ts
{ data: T }        // success
{ error: string }  // failure
```

### `GET /api/brands`

Returns a paginated list of brands with price ranges.

| Query param | Type | Default | Notes |
|---|---|---|---|
| `page` | number | `1` | 1-based page number |
| `limit` | number | `12` | Capped at 12 |

**Example response:**

```json
{
  "data": {
    "brands": [
      { "brand": "Brand-1", "minPrice": 21, "maxPrice": 100 }
    ],
    "total": 52,
    "page": 1,
    "totalPages": 5
  }
}
```

---

### `GET /api/brands/:brand/options`

Returns all available lengths and the widths per length for a brand. Widths are pre-grouped so the client can filter locally when a length is selected — no extra API call needed.

**Example response:**

```json
{
  "data": {
    "lengths": [31, 32, 35, 36, 39, 40, 41, 44, 45, 46, 49, 50],
    "widthsByLength": {
      "31": [36, 40],
      "32": [40],
      "35": [34, 37],
      "36": [47, 49]
    }
  }
}
```

---

### `GET /api/brands/:brand/sku?length=X&width=Y`

Resolves the SKU and exact price for a brand + length + width combination.

**Example response:**

```json
{
  "data": {
    "sku": "sku215",
    "price": 92
  }
}
```

**Error responses:**

| Status | Condition |
|---|---|
| `400` | `length` or `width` missing, non-numeric, or `<= 0` |
| `400` | Brand name empty or longer than 100 characters |
| `404` | No SKU found for the combination |

---

### `GET /health`

Liveness check.

```json
{ "status": "ok" }
```

---

## Architecture

```
Route → Controller → Service → Repository → Database
```

| Layer | Responsibility |
|---|---|
| **Repository** | Raw SQL only — no logic, no transformation |
| **Service** | Business logic: pagination offset, widthsByLength map, SKU lookup |
| **Controller** | Parses and validates inputs, forwards errors via `next(err)` |
| **errorHandler** | Catches `AppError` (typed status code) and all unhandled exceptions |

---

## Key Implementation Details

### Single-query pagination
`COUNT(*) OVER()` window function returns the total brand count alongside the page data in one query — no second round-trip to the database.

```sql
SELECT brand, MIN(price) AS min_price, MAX(price) AS max_price,
       COUNT(*) OVER() AS total_count
FROM products
GROUP BY brand
ORDER BY CAST(NULLIF(REGEXP_REPLACE(brand, '[^0-9]', '', 'g'), '') AS INTEGER) NULLS LAST,
         brand ASC
LIMIT $1 OFFSET $2
```

### Cascading dropdowns (client-side)
On card mount, `/options` fetches the full `widthsByLength` map for that brand. When the user selects a length, the width dropdown is filtered locally — no extra network request per selection.

### Race condition guard
`useBrandCard` uses a `useRef` generation counter. Each SKU fetch is tagged with an ID; only the response matching the latest ID can update state — stale responses from slow or cancelled requests are silently discarded.

### Numeric brand sort
`REGEXP_REPLACE(brand, '[^0-9]', '', 'g')` strips all non-digits before casting to integer. This sorts `Brand-1 … Brand-52` numerically without assuming a fixed prefix format.

### SQL injection prevention
All queries use parameterised placeholders (`$1`, `$2`, `$3`). No string interpolation is used anywhere in the repository layer.

---

## Input Validation

| Input | Rule |
|---|---|
| `page` query param | Parsed as integer, clamped to `[1, 9999]`, defaults to `1` |
| `limit` query param | Parsed as integer, clamped to `[1, 12]`, defaults to `12` |
| `:brand` route param | Trimmed; rejected if empty or `> 100` characters |
| `length` / `width` params | Parsed as integer; rejected if `NaN` or `<= 0` |

---

## TypeScript

Both `client` and `server` use TypeScript strict mode with zero `any` types.

```bash
# Verify client
cd client && npx tsc --noEmit

# Verify server
cd server && npx tsc --noEmit
```

Both commands exit with code `0`.
