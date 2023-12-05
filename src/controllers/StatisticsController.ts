import { Request, Response } from "express";
import { Statistics } from "../entities/Statistics";
import { DeepPartial, getRepository } from "typeorm";
import { Product } from "../entities/Product";
import { start } from "repl";
import { error } from "console";
// import new from './UserController';


class StatisticsController 
{

    async getStatistics(req: Request, res:Response)
    {
        try {
            const statisticsRepository = getRepository(Statistics);
            const statistics = await statisticsRepository.find({
                relations: ['product'],
            });

            return res.json(statistics);
        } catch (err) {
            console.error('Error caught:', err);
            return res.status(500).json({ err: 'Internal Server Error' });
        }
    }

    async getStatisticsById(req: Request, res:Response)
    {
        try {
            const statiscsId = parseInt(req.params.id, 10);
            const statisticsRepository = getRepository(Statistics);
            const productStatistic = await statisticsRepository.findOne({ where: {id: statiscsId}, relations: ['product']});

            if (!productStatistic) {
                return res.status(404).json({ error: 'Statistics not found for the specified product' });
            }

            // const totalRevenue = parseFloat(productStatistic.revenue);
            // const totalQuantitySold = parseFloat(productStatistic.quantity_sold);

            
            return res.json(productStatistic)
        }
        catch(err)
        {
            console.log(err)
            return res.status(500).json({  err: 'Internal Server Error' })
        }   
    }

    
    async createStatistics(req: Request, res: Response)
    {
        try
        {
            const { product_id, revenue, quantity_sold } = req.body;


            if (!product_id || !revenue || !quantity_sold)
            {
                return res.status(400).json( {error: "Error, Empty Data"});
            }
            
            const statisticsRepository = getRepository(Statistics)
            const product = await getRepository(Product).findOne({ where : { idproducts: product_id }});

            if(!product)
            {
                return res.status(404).json( 
                {
                    error: "Producto Not Find"
                })
            }


            // const partialStatisticArray = [
            //    {
            //     product_id, 
            //     revenue, 
            //     quantity_sold, 
            //     date: new Date(),
            //    },
                
            //   ];
            const newStatistic = statisticsRepository.create(
                {

                    product,
                    revenue, 
                    quantity_sold,
                    date: new Date(),

                }
            );
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