import { Request, Response, NextFunction } from 'express';
import { brandService } from '../services/brandService';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

export const brandController = {
  getBrands: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Math.max(1, parseInt(String(req.query.page ?? DEFAULT_PAGE), 10) || DEFAULT_PAGE);
      const limit = Math.max(1, parseInt(String(req.query.limit ?? DEFAULT_LIMIT), 10) || DEFAULT_LIMIT);

      const result = await brandService.getBrands(page, limit);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  getBrandOptions: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { brand } = req.params;
      const result = await brandService.getBrandOptions(brand);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  getSku: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { brand } = req.params;
      const length = parseInt(String(req.query.length), 10);
      const width = parseInt(String(req.query.width), 10);

      if (isNaN(length) || isNaN(width)) {
        res.status(400).json({ error: 'length and width query params are required and must be numbers' });
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
