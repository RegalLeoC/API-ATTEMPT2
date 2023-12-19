"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_js_1 = __importDefault(require("../controllers/UserController.js"));
const router = express_1.default.Router();
router.get('/users', UserController_js_1.default.getAllUsers);
router.get('/users/:id', UserController_js_1.default.getUserById);
router.post('/users', UserController_js_1.default.createUser);
router.put('/users/:id', UserController_js_1.default.updateUser);
router.delete('/users/:id', UserController_js_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map