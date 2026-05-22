import { Router } from 'express';
import { brandController } from '../controllers/brandController';

const router = Router();

router.get('/', brandController.getBrands);
router.get('/:brand/options', brandController.getBrandOptions);
router.get('/:brand/sku', brandController.getSku);

export default router;
