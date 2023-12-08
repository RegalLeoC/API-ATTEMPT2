import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Statistics } from '../entities/Statistics';
import { Product } from '../entities/Product';
import { Purchase } from '../entities/Purchase';
import { DetailsBuy } from "../entities/DetailsBuy";

export class StatisticsController {
    static async getMostItemsSoldPerDay() {
        return await getRepository(DetailsBuy)
          .createQueryBuilder("detailsBuy")
          .select("detailsBuy.product_id", "productId")
          .addSelect("DATE(detailsBuy.update_date) as salesDate")
          .addSelect("SUM(detailsBuy.order) as totalSold")
          .groupBy("detailsBuy.product_id")
          .addGroupBy("salesDate")
          .orderBy("totalSold", "DESC")
          .limit(1)
          .getRawOne();
    }

  static async getMostPurchasedHour(req: Request, res: Response): Promise<void> {
    try {
        const mostPurchasedHour = await getRepository(Purchase)
        .createQueryBuilder('purchase')
        .select(['HOUR(purchase.create_date) as purchaseHour', 'COUNT(purchase.id) as totalPurchases'])
        .groupBy('purchaseHour')
        .orderBy('totalPurchases', 'DESC')
        .limit(1)
        .getRawOne();
  
      res.status(200).json(mostPurchasedHour);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}
