"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_js_1 = __importDefault(require("../controllers/ProductController.js"));
const router = (0, express_1.Router)();
router.get('/products', ProductController_js_1.default.getAllProducts);
router.get('/products/:id', ProductController_js_1.default.getProductById);
router.post('/products', ProductController_js_1.default.createProduct);
router.put('/products/:id', ProductController_js_1.default.updateProduct);
router.delete('/products/:id', ProductController_js_1.default.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.routes.js.map