import { Request, Response } from "express";
import { Purchase } from "src/entities/Purchase";
import { getRepository } from "typeorm";
import { Product } from '../entities/Product';
import { error } from "console";
// import new from './UserController';


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

    /*
    async createPurchase(req: Request, res: Response)
    {
        try
        {
            const { description, client_name, total_price, total_products } = req.body;


            if (!description || !client_name || !total_price || !total_products)
            {
                return res.status(400).json( {error: "Error, Empty Data"});
            }
            
            const purchaseRepository = getRepository(Purchase);
            const newPurchase = purchaseRepository.create({
                    description, 
                    client_name, 
                    total_price, 
                    total_products, 
                    create_date : new Date(),
                    create_user : new Date(),
                    update_date: new Date(),
                    active : 1,
                });
            await purchaseRepository.save(newPurchase);

            return res.status(201).json(newPurchase);
        }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({ err: 'Internal Server Error'});
        }
        
    }
    */

    
}

export default PurchasController;