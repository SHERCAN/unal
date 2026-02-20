import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllData = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                role: 'STUDENT',
            },
            include: {
                progreso: true,
                watchedVideos: true,
                exerciseAttempts: {
                    orderBy: {
                        updatedAt: 'desc',
                    },
                },
                pageRatings: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.json(users);
    } catch (error) {
        console.error('Error fetching admin data:', error);
        res.status(500).json({ error: 'Error al obtener datos de administrador' });
    }
};
