import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSetting = async (req: Request, res: Response) => {
    try {
        const { key } = req.params;
        const setting = await prisma.systemSetting.findUnique({
            where: { key }
        });

        // Default values if not found
        if (!setting) {
            if (key === 'allow_registration') {
                return res.json({ key, value: 'true' });
            }
            return res.status(404).json({ error: 'Configuración no encontrada' });
        }

        res.json(setting);
    } catch (error) {
        console.error('Error fetching setting:', error);
        res.status(500).json({ error: 'Error al obtener configuración' });
    }
};

export const upsertSetting = async (req: Request, res: Response) => {
    try {
        const { key, value } = req.body;

        const setting = await prisma.systemSetting.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        });

        res.json(setting);
    } catch (error) {
        console.error('Error updating setting:', error);
        res.status(500).json({ error: 'Error al actualizar configuración' });
    }
};
