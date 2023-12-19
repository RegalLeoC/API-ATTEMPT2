"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/PromotionalProducts.routes.ts
const express_1 = __importDefault(require("express"));
const PromotionalProductsController_1 = __importDefault(require("../controllers/PromotionalProductsController"));
const router = express_1.default.Router();
// Define routes
router.get('/promotionalProducts', PromotionalProductsController_1.default.getAllPromotionalProducts);
router.get('/promotionalProducts/:id', PromotionalProductsController_1.default.getPromotionalProductById);
// Protected routes (require authentication)
router.post('/promotionalProducts', /*authenticateJWT,*/ PromotionalProductsController_1.default.createPromotionalProduct);
router.put('/promotionalProducts/:id', /*authenticateJWT,*/ PromotionalProductsController_1.default.updatePromotionalProduct);
router.delete('/promotionalProducts/:id', /*authenticateJWT,*/ PromotionalProductsController_1.default.deletePromotionalProduct);
exports.default = router;
