"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PromotionalProductsController_js_1 = __importDefault(require("../controllers/PromotionalProductsController.js"));
const router = express_1.default.Router();
router.get('/promotionalProducts', PromotionalProductsController_js_1.default.getAllPromotionalProducts);
router.get('/promotionalProducts/:id', PromotionalProductsController_js_1.default.getPromotionalProductById);
router.post('/promotionalProducts', PromotionalProductsController_js_1.default.createPromotionalProduct);
router.put('/promotionalProducts/:id', PromotionalProductsController_js_1.default.updatePromotionalProduct);
router.delete('/promotionalProducts/:id', PromotionalProductsController_js_1.default.deletePromotionalProduct);
exports.default = router;
//# sourceMappingURL=PromotionalProducts.routes.js.map