import { Router } from 'express';
import healthRoutes from './health.routes';

const router = Router();

// Mount route groups
router.use('/health', healthRoutes);

// Future routes:
// router.use('/auth', authRoutes);     → feat/03-auth-backend
// router.use('/leads', leadRoutes);    → feat/06-leads-crud-backend

export default router;
