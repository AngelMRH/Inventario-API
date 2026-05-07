// src/routes/user.routes.js
import { Router } from 'express';
import prisma from '../config/prisma.js';
import { authenticate, authorizeRole } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar todos los usuarios (solo ADMIN)
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de usuarios }
 *       403: { description: Solo ADMIN puede ver usuarios }
 */
router.get('/', authenticate, authorizeRole('ADMIN'), async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Obtener mi perfil
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Perfil del usuario autenticado }
 */
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

export default router;
