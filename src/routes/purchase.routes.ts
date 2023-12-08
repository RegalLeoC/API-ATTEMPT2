// src/routes/purchase.routes.ts
import express from 'express';
import authenticateJWT from '../middleware/authenticationMiddleware';
import PurchaseController from '../controllers/PurchaseController';

const router = express.Router();

// Protected routes (require authentication)
router.get('/purchases', /*authenticateJWT,*/ PurchaseController.getPurchases);
router.get('/purchase/:id', /*authenticateJWT,*/ PurchaseController.getPurchaseById);
router.post('/purchase', /*authenticateJWT,*/ PurchaseController.createPurchase);

export default router;

