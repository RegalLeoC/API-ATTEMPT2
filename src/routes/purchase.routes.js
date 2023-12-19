"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/purchase.routes.ts
const express_1 = __importDefault(require("express"));
const PurchaseController_1 = __importDefault(require("../controllers/PurchaseController"));
const router = express_1.default.Router();
// Protected routes (require authentication)
router.get('/purchases', /*authenticateJWT,*/ PurchaseController_1.default.getPurchases);
router.get('/purchase/:id', /*authenticateJWT,*/ PurchaseController_1.default.getPurchaseById);
router.post('/purchase', /*authenticateJWT,*/ PurchaseController_1.default.createPurchase);
exports.default = router;
