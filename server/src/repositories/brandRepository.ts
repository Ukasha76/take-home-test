import { Brand, SkuResult } from '../types';

export const brandRepository = {
  findBrandsPaginated: async (_limit: number, _offset: number): Promise<Brand[]> => {
    return [];
  },

  countBrands: async (): Promise<number> => {
    return 0;
  },

  findBrandLengthWidthPairs: async (_brand: string): Promise<{ length: number; width: number }[]> => {
    return [];
  },

  findSku: async (_brand: string, _length: number, _width: number): Promise<SkuResult | null> => {
    return null;
  },
};
