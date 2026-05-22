# CLAUDE.md

## Project
React + PostgreSQL take-home assessment: a paginated brand card UI with cascading dimension dropdowns that resolve to a specific SKU and price.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS (port 5173)
- **Backend**: Node.js, Express, TypeScript, `pg` raw SQL (port 3001)
- **Database**: PostgreSQL — single `products` table (sku, brand, length, width, price)

## Structure
```
client/   → Vite React app
server/   → Express API
docs/     → Architecture and project docs
```

## Commands
```bash
# Server (from /server)
npm run dev

# Client (from /client)
npm run dev
```

## Architecture: MVC
```
Route → Controller → Service → Repository → Database
```
- **Repository**: SQL only — `server/src/repositories/`
- **Service**: Business logic, data transformation — `server/src/services/`
- **Controller**: Request/response handling — `server/src/controllers/`

## API Endpoints
```
GET /api/brands?page=1&limit=12
GET /api/brands/:brand/options
GET /api/brands/:brand/sku?length=X&width=Y
```

## Response Shape
```ts
// Success
{ data: T }

// Error
{ error: string }
```

## Conventions
- TypeScript strict mode — no `any`
- SQL lives only in `server/src/repositories/brandRepository.ts`
- All API calls live in `client/src/services/brandService.ts`
- Prices formatted as `$XX` in the UI (stored as numeric in DB)
- Dropdown values sorted ascending

## Do Not
- Use an ORM — raw `pg` only
- Put SQL outside the repository layer
- Use Redux or any external state library
- Commit `.env`
- Use `any` types
