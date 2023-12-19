import { Request, Response } from 'express';
export declare class StatisticsController {
    static getMostItemsSoldPerDay(): Promise<any>;
    static getMostPurchasedHour(req: Request, res: Response): Promise<void>;
}
