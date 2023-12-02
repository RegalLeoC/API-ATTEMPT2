import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

// GET all users
router.get('/users', UserController.getAllUsers);

// GET user by ID
router.get('/users/:id', UserController.getUserById);

// POST create user
router.post('/users', UserController.createUser);

// PUT update user
router.put('/users/:id', UserController.updateUser);

// DELETE delete user
router.delete('/users/:id', UserController.deleteUser);

export default router;
