import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { notifyProgressUpdate } from '../socket';

const prisma = new PrismaClient();

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nickname: true,
        nombre: true,
        edad: true,
        grado: true,
        avatar: true,
        photoUrl: true,
        puntos: true,
        puntosDefinitivos: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

export const getRanking = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: 'STUDENT',
      },
      select: {
        id: true,
        nickname: true,
        nombre: true,
        avatar: true,
        puntos: true,
        puntosDefinitivos: true,
      },
    });

    // Calculate total points and sort by total
    const rankedUsers = users
      .map(user => ({
        id: user.id,
        nickname: user.nickname,
        nombre: user.nombre,
        avatar: user.avatar,
        puntos: user.puntos + user.puntosDefinitivos, // Total points for display
        puntosFlexibles: user.puntos,
        puntosDefinitivos: user.puntosDefinitivos
      }))
      .sort((a, b) => b.puntos - a.puntos)
      .slice(0, 10);

    res.json(rankedUsers);
  } catch (error) {
    console.error('Error al obtener ranking:', error);
    res.status(500).json({ error: 'Error al obtener ranking' });
  }
};

export const getUserProgress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const progress = await prisma.progreso.findMany({
      where: { userId, completado: true },
      select: { modulo: true }
    });
    res.json(progress.map(p => p.modulo));
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Error fetching progress' });
  }
};

export const updateProgress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { modulo, points } = req.body;

    if (!modulo) return res.status(400).json({ error: 'Modulo required' });

    // Check if already completed
    const existing = await prisma.progreso.findFirst({
      where: { userId, modulo, completado: true }
    });

    if (existing) {
      return res.json({ message: 'Already completed', pointsAdded: 0 });
    }

    // Determine points to add (allow 0)
    const pointsToAward = typeof points === 'number' ? points : 20;

    // 1. Find existing record (completed or not)
    const record = await prisma.progreso.findFirst({ where: { userId, modulo } });

    let result;
    if (record) {
      // Update
      result = await prisma.$transaction([
        prisma.progreso.update({
          where: { id: record.id },
          data: { completado: true, progreso: 100 }
        }),
        prisma.user.update({
          where: { id: userId },
          data: { puntos: { increment: pointsToAward } }
        })
      ]);
    } else {
      // Create
      result = await prisma.$transaction([
        prisma.progreso.create({
          data: {
            userId,
            modulo,
            completado: true,
            progreso: 100
          }
        }),
        prisma.user.update({
          where: { id: userId },
          data: { puntos: { increment: pointsToAward } }
        })
      ]);
    }

    // Notify admin panel
    notifyProgressUpdate(userId);

    res.json({ message: 'Progress updated', pointsAdded: pointsToAward, newTotal: result[1].puntos });

  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Error updating progress' });
  }
}

export const getWatchedVideos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const watched = await prisma.watchedVideo.findMany({
      where: { userId },
      select: { videoId: true }
    });
    res.json(watched.map(w => w.videoId));
  } catch (error) {
    console.error('Error fetching watched videos:', error);
    res.status(500).json({ error: 'Error fetching watched videos' });
  }
};

export const markVideoWatched = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { videoId } = req.body;

    if (!videoId) return res.status(400).json({ error: 'VideoId required' });

    // Check if already watched
    const existing = await prisma.watchedVideo.findUnique({
      where: {
        userId_videoId: { userId, videoId }
      }
    });

    if (existing) {
      // Already watched, no points
      return res.json({
        message: 'Already watched',
        pointsAdded: 0,
        newTotal: 0
      });
    }

    // First time watching: create record and award 10 points
    const result = await prisma.$transaction([
      prisma.watchedVideo.create({
        data: {
          userId,
          videoId
        }
      }),
      prisma.user.update({
        where: { id: userId },
        data: { puntos: { increment: 10 } }
      })
    ]);

    // Notify admin panel
    notifyProgressUpdate(userId);

    res.json({
      message: 'Video marked as watched',
      pointsAdded: 10,
      newTotal: result[1].puntos
    });
  } catch (error) {
    console.error('Error marking video watched:', error);
    res.status(500).json({ error: 'Error marking video watched' });
  }
};

