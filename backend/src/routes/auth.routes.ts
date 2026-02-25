import { Router } from 'express';
import { register, login, forgotPassword, logout, pulse } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/logout', authMiddleware, logout);
router.post('/pulse', authMiddleware, pulse);

export default router;
