import { Request, Response } from "express";
import { Purchase } from "../entities/Purchase";
import { DeepPartial, getRepository } from "typeorm";
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
            console.error('Error caught:', err);
            return res.status(500).json({ err: 'Internal Server Error'});
        }
    }

    async getPurchaseById(req: Request, res:Response)
    {
        try
        {
            // console.log("---------------------------------------------------");
            // console.log("Purchase ID:", req.params.id, "Tipo:" , typeof req.params.id);
            const purchaseId = parseInt(req.params.id, 10);
            const purchaseRepository = getRepository(Purchase);


            // if (isNaN(purchaseId)) {
            //     console.log("Purchase ID:", purchaseId, "Tipo:" , typeof purchaseId);
            //     return res.status(400).json({ error: 'Invalid purchase ID' });
            //   }

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
            return res.status(500).json({ err: 'Internal Server Error PurchaseID'});
        }
    }

    
    async createPurchase(req: Request, res: Response)
    {
        try
        {
            const { description, client_name, last_name ,total_price, total_products, create_user, active} = req.body;


            if (!description || !client_name || !last_name || !total_price || !total_products || !create_user || !active)
            {
                return res.status(400).json( {error: "Error, Empty Data"});
            }
            

            //Verificar que si jale, ya que es un arreglo ahora
            const purchaseRepository = getRepository(Purchase)
            const partialPurchaseArray = [
               {
                description,
                client_name, 
                last_name,
                total_price, 
                total_products, 
                create_date : new Date(),
                create_user,
                update_date: new Date(),
                active,
               },
                
              ];



            const newPurchase = purchaseRepository.create(partialPurchaseArray);
            await purchaseRepository.save(newPurchase);


            return res.status(201).json(newPurchase);
        }
        catch(err)
        {
            console.error('Error caught:', err);
            return res.status(500).json({ err: 'Internal Server Error'});
        }
        
    }
}

export default new PurchasController();