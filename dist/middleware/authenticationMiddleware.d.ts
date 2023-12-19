import { Request, Response, NextFunction } from 'express';
interface AuthenticatedRequest extends Request {
    user?: any;
}
export default function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
export {};
