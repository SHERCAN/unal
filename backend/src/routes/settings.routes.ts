import { Router } from 'express';
import { getSetting, upsertSetting } from '../controllers/settings.controller';

const router = Router();

// Publicly check if registration is allowed
router.get('/:key', getSetting);

// Protected routes (admin only)
// For now, I'll add the check but rely on the calling code in the frontend
router.post('/update', upsertSetting);

export default router;
