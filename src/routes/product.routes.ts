// src/routes/productRoutes.ts
import { Router } from 'express';
import authenticateJWT from '../middleware/authenticationMiddleware';
import ProductController from '../controllers/ProductController';

const router = Router();


router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);

// Protected routes (require authentication)
router.post('/products', /*authenticateJWT,*/ ProductController.createProduct);
router.put('/products/:id', /*authenticateJWT,*/ ProductController.updateProduct);
router.delete('/products/:id', /*authenticateJWT,*/ ProductController.deleteProduct);

export default router;
