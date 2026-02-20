import { Router } from 'express';
import { getAllData } from '../controllers/admin.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// TODO: Add isAdmin middleware if needed, for now just relying on frontend to check or another middleware
router.get('/data', authMiddleware, getAllData);

export default router;
