import { Request, Response } from "express";
import { Purchase } from "src/entities/Purchase";
import { getRepository } from "typeorm";
import { Product } from '../entities/Product';


class PurchasController 
{
    async getPurchases(req: Request, res : Response)
    {
        try
        {
            const purchaseRepository = getRepository(Purchase);
            const purchases = await purchaseRepository.find();
            return res.json(purchases);
        }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({ err: 'Internal Server Error'});
        }
    }
}