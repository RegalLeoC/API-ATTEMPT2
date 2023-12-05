import { Request, Response } from "express";
import { Purchase } from "../entities/Purchase";
import { DeepPartial, getRepository } from "typeorm";
import { DetailsBuy } from "../entities/DetailsBuy";

class PurchaseController 
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

    
    async createPurchase(req: Request, res: Response) {
        try {
          const { description, client_name, last_name, total_price, total_products, create_user, active, details } = req.body;
      
          // Data validation
          if (!description || !client_name || !last_name || isNaN(total_price) || isNaN(total_products) || typeof active !== 'boolean' || !details) {
            return res.status(400).json({ error: "Invalid or missing data in the request body" });
          }
      
          // Date handling
          const create_date = new Date();
          const update_date = new Date();
      
          const purchaseRepository = getRepository(Purchase);
          const detailsBuyRepository = getRepository(DetailsBuy);
      
          // Create purchase entity
          const newPurchase = purchaseRepository.create({
            description,
            client_name,
            last_name,
            total_price,
            total_products,
            create_date,
            create_user,
            update_date,
            active,
          });
      
          // Save purchase entity to get its ID
          await purchaseRepository.save(newPurchase);
      
          // Create and associate DetailsBuy entities
          const detailsBuyEntities = details.map((detail: any) => {
            return detailsBuyRepository.create({
              product: detail.product,
              order: detail.order,
              create_user: detail.create_user,
              update_date: new Date(),
              purchase: newPurchase, // Associate with the newly created Purchase
            });
          });
      
          // Save DetailsBuy entities
          await detailsBuyRepository.save(detailsBuyEntities);
      
          return res.status(201).json(newPurchase);
        } catch (err) {
          console.error('Error caught:', err);
          return res.status(500).json({ err: 'Internal Server Error' });
        }
      }
       
}

export default new PurchaseController();