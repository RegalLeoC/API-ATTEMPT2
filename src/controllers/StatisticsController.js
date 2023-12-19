"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsController = void 0;
const typeorm_1 = require("typeorm");
const Purchase_1 = require("../entities/Purchase");
const DetailsBuy_1 = require("../entities/DetailsBuy");
class StatisticsController {
    static async getMostItemsSoldPerDay() {
        return await (0, typeorm_1.getRepository)(DetailsBuy_1.DetailsBuy)
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
    static async getMostPurchasedHour(req, res) {
        try {
            const mostPurchasedHour = await (0, typeorm_1.getRepository)(Purchase_1.Purchase)
                .createQueryBuilder('purchase')
                .select(['HOUR(purchase.create_date) as purchaseHour', 'COUNT(purchase.id) as totalPurchases'])
                .groupBy('purchaseHour')
                .orderBy('totalPurchases', 'DESC')
                .limit(1)
                .getRawOne();
            res.status(200).json(mostPurchasedHour);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}
exports.StatisticsController = StatisticsController;
