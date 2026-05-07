// src/routes/product.routes.js
import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { authenticate, authorizeRole } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.js';
import { productSchema } from '../models/schemas.js';

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Listar productos (USER, EDITOR, ADMIN)
 *     tags: [Products]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *     responses:
 *       200: { description: Lista de productos con paginación }
 *       401: { description: Token requerido }
 */
router.get('/', authenticate, getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener producto por ID (USER, EDITOR, ADMIN)
 *     tags: [Products]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Producto encontrado }
 *       404: { description: Producto no encontrado }
 */
router.get('/:id', authenticate, getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear producto (solo ADMIN y EDITOR)
 *     tags: [Products]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, category]
 *             properties:
 *               name: { type: string, example: "Laptop Dell XPS" }
 *               description: { type: string }
 *               price: { type: number, example: 25000 }
 *               stock: { type: integer, example: 10 }
 *               category: { type: string, example: "Electrónica" }
 *     responses:
 *       201: { description: Producto creado }
 *       403: { description: Sin permisos suficientes }
 */
router.post('/', authenticate, authorizeRole('ADMIN', 'EDITOR'), validate(productSchema), createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar producto (solo ADMIN y EDITOR)
 *     tags: [Products]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Producto actualizado }
 *       403: { description: Sin permisos suficientes }
 */
router.put('/:id', authenticate, authorizeRole('ADMIN', 'EDITOR'), validate(productSchema), updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar producto (solo ADMIN)
 *     tags: [Products]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Producto eliminado }
 *       403: { description: Solo ADMIN puede eliminar }
 */
router.delete('/:id', authenticate, authorizeRole('ADMIN'), deleteProduct);

export default router;
