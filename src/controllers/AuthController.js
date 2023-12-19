"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const secretKey = 'yourSecretKey'; // Replace with your actual secret key
const AuthController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            // Replace this with your actual authentication logic
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const user = await userRepository.findOne({
                where: { email, password },
            });
            if (!user) {
                console.log('User not found:', email);
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            // Issue a JWT with user ID in the payload
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
            console.log('User authenticated:', email);
            return res.json({ token });
        }
        catch (error) {
            console.error('Authentication error:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
exports.default = AuthController;
