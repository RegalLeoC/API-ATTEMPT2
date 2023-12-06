
// src/routes/PromotionalProducts.routes.ts
import express from 'express';
import authenticateJWT from '../middleware/authenticationMiddleware';
import PromotionalProductsController from '../controllers/PromotionalProductsController';

const router = express.Router();

// Define routes
router.get('/promotionalProducts', PromotionalProductsController.getAllPromotionalProduct);
router.get('/promotionalProducts/:id', PromotionalProductsController.getPromotionalProductById);
// Protected routes (require authentication)
router.post('/promotionalProducts', authenticateJWT, PromotionalProductsController.createPromotionalProduct);
router.put('/promotionalProducts/:id', authenticateJWT, PromotionalProductsController.updatePromotionalProduct);
router.delete('/promotionalProducts/:id', authenticateJWT, PromotionalProductsController.deletePromotionalProduct);

export default router;
