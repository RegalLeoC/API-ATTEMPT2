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

    async getPurchaseById(req: Request, res:Response)
    {
        try
        {
            const purchaseId = parseInt(req.params.id, 10);
            const purchaseRepository = getRepository(Purchase);
            const purchase = await purchaseRepository.findOne( { where : {id : purchaseId}});

            if(!purchase)
            {
                return res.status(404).json({ error: "Purchase Not Found"}) 
            }
            return res.json(purchase)
        }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({ err: 'Internal Server Error'});
        }
        
    }
}