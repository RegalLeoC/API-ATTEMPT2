// src/middleware/authenticationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'yourSecretKey'; 

interface AuthenticatedRequest extends Request {
  user?: any;
}

export default function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    req.user = user;
    next();
  });
}

