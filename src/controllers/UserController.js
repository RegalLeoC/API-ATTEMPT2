"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
class UserController {
    async getAllUsers(req, res) {
        try {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const users = await userRepository.find();
            return res.json(users);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getUserById(req, res) {
        try {
            const userId = parseInt(req.params.id, 10);
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const user = await userRepository.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json(user);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async createUser(req, res) {
        try {
            const { name, email, password, age, phone_number } = req.body;
            if (!name || !email || !password || !age || !phone_number) {
                return res.status(400).json({ error: 'Name, email, password, age, and phone_number are required' });
            }
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
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
            await userRepository.save(newUser);
            return res.status(201).json(newUser);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async updateUser(req, res) {
        try {
            const userId = parseInt(req.params.id, 10);
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const user = await userRepository.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Update user properties based on your requirements
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.age = req.body.age || user.age;
            user.phone_number = req.body.phone_number || user.phone_number;
            user.update_date = new Date();
            await userRepository.save(user);
            return res.json(user);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = parseInt(req.params.id, 10);
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const user = await userRepository.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            await userRepository.remove(user);
            return res.json({ message: 'User deleted successfully' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.default = new UserController();
