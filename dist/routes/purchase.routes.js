"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PurchaseController_js_1 = __importDefault(require("../controllers/PurchaseController.js"));
const router = express_1.default.Router();
router.get('/purchases', PurchaseController_js_1.default.getPurchases);
router.get('/purchase/:id', PurchaseController_js_1.default.getPurchaseById);
router.post('/purchase', PurchaseController_js_1.default.createPurchase);
exports.default = router;
//# sourceMappingURL=purchase.routes.js.map