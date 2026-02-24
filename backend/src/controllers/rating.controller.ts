import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { notifyProgressUpdate } from '../socket';

const prisma = new PrismaClient();

export const submitRating = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { pageId, rating } = req.body;

        if (!userId || !pageId || rating === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if user already rated this page
        const existingRating = await prisma.pageRating.findUnique({
            where: {
                userId_pageId: {
                    userId,
                    pageId
                }
            }
        });

        if (existingRating) {
            return res.status(400).json({ error: 'Page already rated by this user' });
        }

        const newRating = await prisma.pageRating.create({
            data: {
                userId,
                pageId,
                rating
            }
        });

        // Notify admin panel
        notifyProgressUpdate(userId);

        res.status(201).json(newRating);
    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getPageRating = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { pageId } = req.query;

        if (!userId || !pageId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const rating = await prisma.pageRating.findUnique({
            where: {
                userId_pageId: {
                    userId: String(userId),
                    pageId: String(pageId)
                }
            }
        });

        res.json({ rated: !!rating, rating: rating?.rating });
    } catch (error) {
        console.error('Error fetching rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
