import { Request, Response } from 'express';
declare const AuthController: {
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default AuthController;
