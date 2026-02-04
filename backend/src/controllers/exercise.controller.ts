import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCompletedExercises = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;

        const completedExercises = await prisma.exerciseAttempt.findMany({
            where: {
                userId,
                completed: true
            },
            select: {
                exerciseId: true,
                attemptCount: true
            }
        });

        // Return as a map for easy lookup
        const exerciseMap: Record<string, { completed: boolean; attemptCount: number }> = {};
        completedExercises.forEach(ex => {
            exerciseMap[ex.exerciseId] = {
                completed: true,
                attemptCount: ex.attemptCount || 1
            };
        });

        res.json(exerciseMap);

    } catch (error) {
        console.error('Error fetching completed exercises:', error);
        res.status(500).json({ error: 'Error fetching completed exercises' });
    }
};

export const submitExercise = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { exerciseId, isCorrect } = req.body;

        if (!exerciseId || typeof isCorrect !== 'boolean') {
            return res.status(400).json({ error: 'exerciseId and isCorrect (boolean) are required' });
        }

        // Find existing exercise attempt record
        let attempt = await prisma.exerciseAttempt.findUnique({
            where: { userId_exerciseId: { userId, exerciseId } }
        });

        let pointsAdded = 0;
        let pointsDefinitivosAdded = 0;
        let pointType: 'definitive' | 'flexible' | 'none' = 'none';
        let currentAttemptCount = 1;

        if (!attempt) {
            // First attempt ever
            currentAttemptCount = 1;

            if (isCorrect) {
                // Correct on first try: +50 flexible + 50 definitive (100 total)
                await prisma.$transaction([
                    prisma.exerciseAttempt.create({
                        data: {
                            userId,
                            exerciseId,
                            attempted: true,
                            completed: true,
                            attemptCount: 1
                        }
                    }),
                    prisma.user.update({
                        where: { id: userId },
                        data: {
                            puntos: { increment: 50 },
                            puntosDefinitivos: { increment: 50 }
                        }
                    })
                ]);
                pointsAdded = 50;
                pointsDefinitivosAdded = 50;
                pointType = 'definitive';
            } else {
                // Incorrect on first try: no points, just mark as attempted
                await prisma.exerciseAttempt.create({
                    data: {
                        userId,
                        exerciseId,
                        attempted: true,
                        completed: false,
                        attemptCount: 1
                    }
                });
            }
        } else {
            // Subsequent attempt
            currentAttemptCount = attempt.attemptCount + 1;

            if (isCorrect && !attempt.completed) {
                // Determine points based on attempt count
                let flexiblePoints = 0;

                if (currentAttemptCount === 2) {
                    flexiblePoints = 25; // Second attempt
                } else {
                    flexiblePoints = 10; // Third+ attempt
                }

                // Update attempt and award points
                await prisma.$transaction([
                    prisma.exerciseAttempt.update({
                        where: { id: attempt.id },
                        data: {
                            completed: true,
                            attemptCount: currentAttemptCount
                        }
                    }),
                    prisma.user.update({
                        where: { id: userId },
                        data: { puntos: { increment: flexiblePoints } }
                    })
                ]);
                pointsAdded = flexiblePoints;
                pointType = 'flexible';
            } else if (!isCorrect) {
                // Incorrect retry: just increment attempt count
                await prisma.exerciseAttempt.update({
                    where: { id: attempt.id },
                    data: { attemptCount: currentAttemptCount }
                });
            }
            // If already completed or incorrect retry, no points awarded
        }

        // Fetch updated user data
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { puntos: true, puntosDefinitivos: true }
        });

        res.json({
            pointsAdded,
            pointsDefinitivosAdded,
            pointType,
            attemptCount: currentAttemptCount,
            newFlexibleTotal: user?.puntos || 0,
            newDefinitiveTotal: user?.puntosDefinitivos || 0
        });

    } catch (error) {
        console.error('Error submitting exercise:', error);
        res.status(500).json({ error: 'Error submitting exercise' });
    }
};

// New function for CPA games
export const submitGame = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { gameId, isCorrect } = req.body;

        if (!gameId || typeof isCorrect !== 'boolean') {
            return res.status(400).json({ error: 'gameId and isCorrect (boolean) are required' });
        }

        // Find existing game attempt record
        let attempt = await prisma.exerciseAttempt.findUnique({
            where: { userId_exerciseId: { userId, exerciseId: gameId } }
        });

        let pointsAdded = 0;
        let pointsDefinitivosAdded = 0;
        let pointType: 'definitive' | 'flexible' | 'none' = 'none';
        let currentAttemptCount = 1;

        if (!attempt) {
            // First attempt ever
            currentAttemptCount = 1;

            if (isCorrect) {
                // Correct on first try: +20 flexible + 20 definitive (40 total)
                await prisma.$transaction([
                    prisma.exerciseAttempt.create({
                        data: {
                            userId,
                            exerciseId: gameId,
                            attempted: true,
                            completed: true,
                            attemptCount: 1
                        }
                    }),
                    prisma.user.update({
                        where: { id: userId },
                        data: {
                            puntos: { increment: 20 },
                            puntosDefinitivos: { increment: 20 }
                        }
                    })
                ]);
                pointsAdded = 20;
                pointsDefinitivosAdded = 20;
                pointType = 'definitive';
            } else {
                // Incorrect on first try: no points, just mark as attempted
                await prisma.exerciseAttempt.create({
                    data: {
                        userId,
                        exerciseId: gameId,
                        attempted: true,
                        completed: false,
                        attemptCount: 1
                    }
                });
            }
        } else {
            // Subsequent attempt
            currentAttemptCount = attempt.attemptCount + 1;

            if (isCorrect && !attempt.completed) {
                // Determine points based on attempt count
                let flexiblePoints = 0;

                if (currentAttemptCount === 2) {
                    flexiblePoints = 10; // Second attempt
                } else {
                    flexiblePoints = 5; // Third+ attempt
                }

                // Update attempt and award points
                await prisma.$transaction([
                    prisma.exerciseAttempt.update({
                        where: { id: attempt.id },
                        data: {
                            completed: true,
                            attemptCount: currentAttemptCount
                        }
                    }),
                    prisma.user.update({
                        where: { id: userId },
                        data: { puntos: { increment: flexiblePoints } }
                    })
                ]);
                pointsAdded = flexiblePoints;
                pointType = 'flexible';
            } else if (!isCorrect) {
                // Incorrect retry: just increment attempt count
                await prisma.exerciseAttempt.update({
                    where: { id: attempt.id },
                    data: { attemptCount: currentAttemptCount }
                });
            }
            // If already completed or incorrect retry, no points awarded
        }

        // Fetch updated user data
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { puntos: true, puntosDefinitivos: true }
        });

        res.json({
            pointsAdded,
            pointsDefinitivosAdded,
            pointType,
            attemptCount: currentAttemptCount,
            newFlexibleTotal: user?.puntos || 0,
            newDefinitiveTotal: user?.puntosDefinitivos || 0
        });

    } catch (error) {
        console.error('Error submitting game:', error);
        res.status(500).json({ error: 'Error submitting game' });
    }
};
