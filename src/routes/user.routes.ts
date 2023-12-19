// src/routes/user.routes.ts
import express from 'express';
import authenticateJWT from '../middleware/authenticationMiddleware.js';

import UserController from '../controllers/UserController.js';

const router = express.Router();

// Define routes
router.get('/users', /*authenticateJWT,*/ UserController.getAllUsers);
router.get('/users/:id', /*authenticateJWT,*/ UserController.getUserById);
router.post('/users', /*authenticateJWT,*/ UserController.createUser);
router.put('/users/:id', /*authenticateJWT,*/ UserController.updateUser);
router.delete('/users/:id',/*authenticateJWT,*/ UserController.deleteUser);

export default router;
