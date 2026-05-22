import { Request, Response, NextFunction } from 'express';

export const brandController = {
  getBrands: async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json({ data: {} });
    } catch (err) {
      next(err);
    }
  },

  getBrandOptions: async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json({ data: {} });
    } catch (err) {
      next(err);
    }
  },

  getSku: async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json({ data: {} });
    } catch (err) {
      next(err);
    }
  },
};
