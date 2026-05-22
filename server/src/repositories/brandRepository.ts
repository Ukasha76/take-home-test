import pool from '../db/pool';
import { Brand, SkuResult } from '../types';

export const brandRepository = {
  findBrandsPaginated: async (limit: number, offset: number): Promise<Brand[]> => {
    const { rows } = await pool.query<{
      brand: string;
      min_price: string;
      max_price: string;
    }>(
      `SELECT brand, MIN(price) AS min_price, MAX(price) AS max_price
       FROM products
       GROUP BY brand
       ORDER BY brand ASC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return rows.map((row) => ({
      brand: row.brand,
      minPrice: Number(row.min_price),
      maxPrice: Number(row.max_price),
    }));
  },

  countBrands: async (): Promise<number> => {
    const { rows } = await pool.query<{ count: string }>(
      'SELECT COUNT(DISTINCT brand) AS count FROM products'
    );
    return Number(rows[0].count);
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
