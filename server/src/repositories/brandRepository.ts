import pool from '../db/pool';
import { Brand, SkuResult } from '../types';

export const brandRepository = {
  findBrandsPaginated: async (
    limit: number,
    offset: number
  ): Promise<{ brands: Brand[]; total: number }> => {
    const { rows } = await pool.query<{
      brand: string;
      min_price: string;
      max_price: string;
      total_count: string;
    }>(
      `SELECT brand, MIN(price) AS min_price, MAX(price) AS max_price,
              COUNT(*) OVER() AS total_count
       FROM products
       GROUP BY brand
       ORDER BY CAST(NULLIF(REGEXP_REPLACE(brand, '[^0-9]', '', 'g'), '') AS INTEGER) NULLS LAST,
                brand ASC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return {
      brands: rows.map((row) => ({
        brand: row.brand,
        minPrice: Number(row.min_price),
        maxPrice: Number(row.max_price),
      })),
      total: rows.length > 0 ? Number(rows[0].total_count) : 0,
    };
  },

  findBrandLengthWidthPairs: async (
    brand: string
  ): Promise<{ length: number; width: number }[]> => {
    const { rows } = await pool.query<{ length: number; width: number }>(
      `SELECT DISTINCT length, width
       FROM products
       WHERE brand = $1
       ORDER BY length ASC, width ASC`,
      [brand]
    );
    return rows;
  },

  findSku: async (
    brand: string,
    length: number,
    width: number
  ): Promise<SkuResult | null> => {
    const { rows } = await pool.query<{ sku: string; price: string }>(
      `SELECT sku, price
       FROM products
       WHERE brand = $1 AND length = $2 AND width = $3
       LIMIT 1`,
      [brand, length, width]
    );
    if (rows.length === 0) return null;
    return { sku: rows[0].sku, price: Number(rows[0].price) };
  },
};
