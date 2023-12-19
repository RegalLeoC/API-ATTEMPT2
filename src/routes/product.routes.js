"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/productRoutes.ts
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const router = (0, express_1.Router)();
router.get('/products', ProductController_1.default.getAllProducts);
router.get('/products/:id', ProductController_1.default.getProductById);
// Protected routes (require authentication)
router.post('/products', /*authenticateJWT,*/ ProductController_1.default.createProduct);
router.put('/products/:id', /*authenticateJWT,*/ ProductController_1.default.updateProduct);
router.delete('/products/:id', /*authenticateJWT,*/ ProductController_1.default.deleteProduct);
exports.default = router;
