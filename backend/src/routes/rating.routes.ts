import { Router } from 'express';
import { submitRating, getPageRating } from '../controllers/rating.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, submitRating);
router.get('/', authMiddleware, getPageRating);

export default router;
