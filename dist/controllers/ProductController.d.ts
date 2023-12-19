import { Request, Response } from 'express';
export default class ProductController {
    static getAllProducts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getProductById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static createProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static updateProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static deleteProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static createPromotionalProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
