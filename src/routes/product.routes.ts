// src/routes/productRoutes.ts
import { Router } from 'express';
import ProductController from '../Controllers/ProductController';

const router = Router();

// Define routes
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

export default router;
