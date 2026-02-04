import { Router } from 'express';
import { getProfile, getRanking, getUserProgress, updateProgress, getWatchedVideos, markVideoWatched } from '../controllers/user.controller';
import { submitExercise, submitGame, getCompletedExercises } from '../controllers/exercise.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/profile', authMiddleware, getProfile);
router.get('/ranking', getRanking);
router.get('/progress', authMiddleware, getUserProgress);
router.post('/progress', authMiddleware, updateProgress);
router.get('/videos', authMiddleware, getWatchedVideos);
router.post('/videos', authMiddleware, markVideoWatched);
router.get('/exercises', authMiddleware, getCompletedExercises);
router.post('/exercises', authMiddleware, submitExercise);
router.post('/games', authMiddleware, submitGame);

export default router;
