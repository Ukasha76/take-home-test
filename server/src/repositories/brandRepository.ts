import pool from '../db/pool';
import { Brand, BrandOptions, SkuResult } from '../types';

// All SQL queries live here — data access layer only

export const brandRepository = {
  findBrandsPaginated: async (limit: number, offset: number): Promise<Brand[]> => {
    // Implemented in Phase 3
    return [];
  },

  countBrands: async (): Promise<number> => {
    // Implemented in Phase 3
    return 0;
  },

  findBrandLengthWidthPairs: async (brand: string): Promise<{ length: number; width: number }[]> => {
    // Implemented in Phase 3
    return [];
  },

  findSku: async (brand: string, length: number, width: number): Promise<SkuResult | null> => {
    // Implemented in Phase 3
    return null;
  },
};
