import express from 'express';
import PromotionalProductsController from '../controllers/PromotionalProductsController';

const router = express.Router();

// GET all users
router.get('/promotionalProducts', PromotionalProductsController.getAllPromotionalProduct);

// GET user by ID
router.get('/promotionalProducts/:id', PromotionalProductsController.getPromotionalProductById);

// POST create user
router.post('/promotionalProducts', PromotionalProductsController.createPromotionalProduct);

// PUT update user
router.put('/promotionalProducts/:id', PromotionalProductsController.updatePromotionalProduct);

// DELETE delete user
router.delete('/promotionalProducts/:id', PromotionalProductsController.deletePromotionalProduct);

export default router;
