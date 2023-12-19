import { Request, Response } from 'express';
declare class PromotionalProductController {
    private promotionalProductRepository;
    private productRepository;
    getAllPromotionalProducts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getPromotionalProductById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createPromotionalProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updatePromotionalProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deletePromotionalProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: PromotionalProductController;
export default _default;
