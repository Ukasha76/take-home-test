import { Request, Response, NextFunction } from 'express';
import { brandService } from '../services/brandService';

// HTTP layer only — parse request, call service, send response

const DEFAULT_LIMIT = 12;

export const brandController = {
  getBrands: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Implemented in Phase 3
    res.json({ data: {} });
  },

  getBrandOptions: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Implemented in Phase 3
    res.json({ data: {} });
  },

  getSku: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Implemented in Phase 3
    res.json({ data: {} });
  },
};
