import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { nickname, password, nombre, edad, grado, avatar, photoUrl } = req.body;

    const allowRegistration = await prisma.systemSetting.findUnique({
      where: { key: 'allow_registration' }
    });

    if (allowRegistration && allowRegistration.value === 'false') {
      return res.status(403).json({ error: 'El registro de nuevos usuarios está desactivado temporalmente.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { nickname } });
    if (existingUser) {
      return res.status(400).json({ error: 'El nickname ya está en uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nickname,
        password: hashedPassword,
        nombre,
        edad: parseInt(edad),
        grado,
        avatar,
        photoUrl,
      },
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        nickname: user.nickname,
        nombre: user.nombre,
        edad: user.edad,
        grado: user.grado,
        avatar: user.avatar,
        puntos: user.puntos,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { nickname, password } = req.body;

    const user = await prisma.user.findUnique({ where: { nickname } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    // Create session
    const session = await prisma.userSession.create({
      data: {
        userId: user.id
      }
    });

    res.json({
      token,
      sessionId: session.id,
      user: {
        id: user.id,
        nickname: user.nickname,
        nombre: user.nombre,
        edad: user.edad,
        grado: user.grado,
        avatar: user.avatar,
        puntos: user.puntos,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;
    const userId = (req as any).userId;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID es requerido' });
    }

    await prisma.userSession.update({
      where: { id: sessionId, userId },
      data: {
        endTime: new Date(),
        lastActive: new Date()
      }
    });

    res.json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({ error: 'Error al cerrar sesión' });
  }
};

export const pulse = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;
    const userId = (req as any).userId;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID es requerido' });
    }

    await prisma.userSession.update({
      where: { id: sessionId, userId },
      data: {
        lastActive: new Date()
      }
    });

    res.json({ status: 'ok' });
  } catch (error) {
    console.error('Error en pulse:', error);
    res.status(500).json({ error: 'Error en pulso de sesión' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { nickname } = req.body;

    const user = await prisma.user.findUnique({ where: { nickname } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // TODO: Implementar envío de email o método de recuperación
    res.json({ message: 'Instrucciones de recuperación enviadas' });
  } catch (error) {
    console.error('Error en recuperación:', error);
    res.status(500).json({ error: 'Error al procesar solicitud' });
  }
};
