// src/routes/auth.routes.js
import { Router } from 'express';
import { register, login, refresh, logout } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema, loginSchema } from '../models/schemas.js';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: "Angel Ruiz" }
 *               email: { type: string, example: "angel@example.com" }
 *               password: { type: string, example: "password123" }
 *               role: { type: string, enum: [ADMIN, EDITOR, USER] }
 *     responses:
 *       201: { description: Usuario creado exitosamente }
 *       409: { description: Email ya registrado }
 */
router.post('/register', validate(registerSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "angel@example.com" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       200: { description: Login exitoso con tokens }
 *       401: { description: Credenciales inválidas }
 */
router.post('/login', validate(loginSchema), login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Renovar access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken: { type: string }
 *     responses:
 *       200: { description: Nuevos tokens generados }
 *       401: { description: Refresh token inválido }
 */
router.post('/refresh', refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Auth]
 *     responses:
 *       200: { description: Sesión cerrada }
 */
router.post('/logout', logout);

export default router;
