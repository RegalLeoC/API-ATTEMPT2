"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const User_js_1 = require("../entities/User.js");
const secretKey = 'yourSecretKey';
const AuthController = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const userRepository = (0, typeorm_1.getRepository)(User_js_1.User);
            const user = yield userRepository.findOne({
                where: { email, password },
            });
            if (!user) {
                console.log('User not found:', email);
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
            console.log('User authenticated:', email);
            return res.json({ token });
        }
        catch (error) {
            console.error('Authentication error:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }),
};
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map