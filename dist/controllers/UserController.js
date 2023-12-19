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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_js_1 = require("../entities/User.js");
class UserController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepository = (0, typeorm_1.getRepository)(User_js_1.User);
                const users = yield userRepository.find();
                return res.json(users);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                const userRepository = (0, typeorm_1.getRepository)(User_js_1.User);
                const user = yield userRepository.findOne({ where: { id: userId } });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                return res.json(user);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, age, phone_number } = req.body;
                if (!name || !email || !password || !age || !phone_number) {
                    return res.status(400).json({ error: 'Name, email, password, age, and phone_number are required' });
                }
                const userRepository = (0, typeorm_1.getRepository)(User_js_1.User);
                const newUser = userRepository.create({
                    name,
                    email,
                    password,
                    age,
                    phone_number,
                    create_date: new Date(),
                    create_user: new Date(),
                    update_date: new Date(),
                    active: true,
                });
                yield userRepository.save(newUser);
                return res.status(201).json(newUser);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                const userRepository = (0, typeorm_1.getRepository)(User_js_1.User);
                const user = yield userRepository.findOne({ where: { id: userId } });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                user.age = req.body.age || user.age;
                user.phone_number = req.body.phone_number || user.phone_number;
                user.update_date = new Date();
                yield userRepository.save(user);
                return res.json(user);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                const userRepository = (0, typeorm_1.getRepository)(User_js_1.User);
                const user = yield userRepository.findOne({ where: { id: userId } });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                yield userRepository.remove(user);
                return res.json({ message: 'User deleted successfully' });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map