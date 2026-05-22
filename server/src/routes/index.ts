import { Router } from 'express';
import brandRoutes from './brandRoutes';

const router = Router();

router.use('/brands', brandRoutes);

export default router;
