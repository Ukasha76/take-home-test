import { brandRepository } from '../repositories/brandRepository';
import { BrandOptions, PaginatedBrands, SkuResult } from '../types';

export const brandService = {
  getBrands: async (page: number, limit: number): Promise<PaginatedBrands> => {
    const offset = (page - 1) * limit;
    const [brands, total] = await Promise.all([
      brandRepository.findBrandsPaginated(limit, offset),
      brandRepository.countBrands(),
    ]);
    return {
      brands,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  getBrandOptions: async (brand: string): Promise<BrandOptions> => {
    const pairs = await brandRepository.findBrandLengthWidthPairs(brand);
    const widthsByLength: Record<string, number[]> = {};

    for (const { length, width } of pairs) {
      const key = String(length);
      if (!widthsByLength[key]) widthsByLength[key] = [];
      widthsByLength[key].push(width);
    }

    const lengths = Object.keys(widthsByLength)
      .map(Number)
      .sort((a, b) => a - b);

    return { lengths, widthsByLength };
  },

  getSku: async (
    brand: string,
    length: number,
    width: number
  ): Promise<SkuResult | null> => {
    return brandRepository.findSku(brand, length, width);
  },
};
