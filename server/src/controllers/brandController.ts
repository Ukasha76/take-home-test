import { Request, Response, NextFunction } from 'express';
import { brandService } from '../services/brandService';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 12;
const MAX_PAGE = 9999;
const MAX_BRAND_LENGTH = 100;

const parseBrand = (brand: string): string | null => {
  const trimmed = brand.trim();
  if (!trimmed || trimmed.length > MAX_BRAND_LENGTH) return null;
  return trimmed;
};

export const brandController = {
  getBrands: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Math.min(MAX_PAGE, Math.max(1, parseInt(String(req.query.page ?? DEFAULT_PAGE), 10) || DEFAULT_PAGE));
      const limit = Math.min(
        MAX_LIMIT,
        Math.max(1, parseInt(String(req.query.limit ?? DEFAULT_LIMIT), 10) || DEFAULT_LIMIT),
      );

      const result = await brandService.getBrands(page, limit);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  getBrandOptions: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const brand = parseBrand(req.params.brand);
      if (!brand) {
        res.status(400).json({ error: 'Invalid brand parameter' });
        return;
      }

      const result = await brandService.getBrandOptions(brand);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  getSku: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const brand = parseBrand(req.params.brand);
      if (!brand) {
        res.status(400).json({ error: 'Invalid brand parameter' });
        return;
      }

      const length = parseInt(String(req.query.length), 10);
      const width = parseInt(String(req.query.width), 10);

      if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
        res.status(400).json({ error: 'length and width must be positive integers' });
        return;
      }

      const result = await brandService.getSku(brand, length, width);

      if (!result) {
        res.status(404).json({ error: 'No SKU found for this combination' });
        return;
      }

      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  },
};
