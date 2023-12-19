"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_js_1 = __importDefault(require("../controllers/AuthController.js"));
const router = express_1.default.Router();
router.post('/login', AuthController_js_1.default.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map