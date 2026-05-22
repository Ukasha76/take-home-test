# Brand Cards Interface

A React + PostgreSQL product browser. Products are grouped by brand into paginated cards. Each card features cascading dimension dropdowns (length → width) that resolve to a specific SKU and price.

## Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm 9+

## Database Setup

1. Create a PostgreSQL database:
```bash
createdb brand_cards
```

2. Restore the provided SQL dump:
```bash
psql brand_cards < perntesting_database.sql
```

## Server Setup

```bash
cd server
cp .env.example .env
```

Edit `.env` and set your database connection:
```
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/brand_cards
PORT=8001
```

Install dependencies and start:
```bash
npm install
npm run dev
```

Server runs on `http://localhost:8001`

## Client Setup

```bash
cd client
npm install
npm run dev
```

Client runs on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/brands?page=1` | Paginated brand list with price ranges |
| GET | `/api/brands/:brand/options` | Lengths and width map for a brand |
| GET | `/api/brands/:brand/sku?length=X&width=Y` | SKU and price for a dimension combo |

## Design Decisions
- **MVC architecture**: Repository → Service → Controller separation keeps SQL, business logic, and HTTP concerns isolated
- **`/options` prefetch**: Each card fetches its full length→width map on mount, enabling client-side cascade filtering with no additional API calls per length selection
- **Raw SQL**: `pg` used directly to demonstrate SQL fluency without ORM abstraction
