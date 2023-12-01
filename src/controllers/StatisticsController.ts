import { Request, Response } from "express";
import { Statistics } from "../entities/Statistics";
import { DeepPartial, getRepository } from "typeorm";
// import new from './UserController';


class StatisticsController 
{

    async getStatistics(req: Request, res : Response)
    {
        try
        {
            const statisticsRepository = getRepository(Statistics);
            const statistics = await statisticsRepository.find();
            return res.json(statistics);
        }
        catch(err)
        {
            console.log(err);
            console.error('Error caught:', err);
            return res.status(500).json({ err: 'Internal Server Error'});
        }
    }

    async getStatisticsById(req: Request, res:Response)
    {
        try
        {
            const statisticsId = parseInt(req.params.id, 10);
            const statisticsRepository = getRepository(Statistics);


            const statistics = await statisticsRepository.findOne( { where : {id : statisticsId}});

            if(!statistics)
            {
                return res.status(404).json({ error: "Statistic Not Found"}) 
            }


            return res.json(statistics)
        }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({ err: 'Internal Server Error PurchaseID'});
        }
    }

    
    async createStatistics(req: Request, res: Response)
    {
        try
        {
            const { purchase_id , product_id, revenue, quantity_sold } = req.body;


            if (!purchase_id || !product_id || !revenue || !quantity_sold)
            {
                return res.status(400).json( {error: "Error, Empty Data"});
            }
            

            
            const statisticsRepository = getRepository(Statistics)
            const partialStatisticArray = [
               {
                purchase_id, 
                product_id, 
                revenue, 
                quantity_sold, 
                date: new Date(),
               },
                
              ];



            const newStatistic = statisticsRepository.create(partialStatisticArray);
            await statisticsRepository.save(newStatistic);


            return res.status(201).json(newStatistic);
        }
        catch(err)
        {
            console.error('Error caught:', err);
            return res.status(500).json({ err: 'Internal Server Error'});
        }

        //Arreglar la Base de Datos
        
    }
}

export default new StatisticsController();