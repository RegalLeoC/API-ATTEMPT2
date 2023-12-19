import { Request, Response } from "express";
declare class PurchaseController {
    getPurchases(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getPurchaseById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createPurchase(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: PurchaseController;
export default _default;
