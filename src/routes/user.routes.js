"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/user.routes.ts
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = express_1.default.Router();
// Define routes
router.get('/users', /*authenticateJWT,*/ UserController_1.default.getAllUsers);
router.get('/users/:id', /*authenticateJWT,*/ UserController_1.default.getUserById);
router.post('/users', /*authenticateJWT,*/ UserController_1.default.createUser);
router.put('/users/:id', /*authenticateJWT,*/ UserController_1.default.updateUser);
router.delete('/users/:id', /*authenticateJWT,*/ UserController_1.default.deleteUser);
exports.default = router;
