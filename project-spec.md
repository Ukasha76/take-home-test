# Project Spec

## Overview
A paginated brand card browser backed by a PostgreSQL `products` table. Each card represents a unique brand and allows users to configure a product by selecting length and width dimensions. Selecting both reveals the matching SKU and exact price.

## Explicit Requirements
- Query `products` table and group by brand
- Each card = one unique brand
- Default card state: brand name + price range (`min(price) – max(price)`)
- Length dropdown: all distinct lengths for that brand, sorted ascending
- Width dropdown: filtered to only widths valid for the selected length (for that brand)
- Width dropdown is disabled until a length is chosen
- When both selected: show matching SKU and exact price
- A valid SKU is always guaranteed by the cascade logic
- Display 12 cards per page
- Pagination controls: previous, next, and page number buttons

## Implied Requirements (not stated, but expected)
- Width selection resets when length changes
- Dropdown values sorted numerically ascending
- Prices displayed as `$XX`, not raw `36.00`
- Loading state while card options fetch
- Error state if an API call fails
- Page numbers show total page count
- Width dropdown shows a placeholder until length is selected

## Data
- Table: `public.products`
- Columns: `sku` (PK), `brand`, `length` (int), `width` (int), `price` (numeric 18,2)
- ~950 SKUs across ~52 brands
- Length/width range: 30–50; Price range: $10–$100
- Pagination: ~5 pages at 12 brands/page

## Edge Cases
- Changing length resets width and clears SKU result
- Width options are brand + length specific — never shown before length is chosen
- Prices are whole numbers in this dataset; format with `$` prefix

## Out of Scope
- Authentication
- Search or global filters
- Sorting/ordering cards
- Unit or integration tests
- Mobile-specific design (responsive grid is sufficient)
