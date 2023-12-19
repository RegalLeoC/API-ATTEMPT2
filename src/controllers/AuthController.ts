// src/controllers/AuthController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entities/User.js';

const secretKey = 'yourSecretKey'; // Replace with your actual secret key

const AuthController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      // Replace this with your actual authentication logic
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({
        where: { email, password },
      });

      if (!user) {
        console.log('User not found:', email);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Issue a JWT with user ID in the payload
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
      console.log('User authenticated:', email);
      return res.json({ token });
    } catch (error) {
      console.error('Authentication error:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default AuthController;
