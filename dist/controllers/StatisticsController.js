"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsController = void 0;
const typeorm_1 = require("typeorm");
const Purchase_js_1 = require("../entities/Purchase.js");
const DetailsBuy_js_1 = require("../entities/DetailsBuy.js");
class StatisticsController {
    static getMostItemsSoldPerDay() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, typeorm_1.getRepository)(DetailsBuy_js_1.DetailsBuy)
                .createQueryBuilder("detailsBuy")
                .select("detailsBuy.product_id", "productId")
                .addSelect("DATE(detailsBuy.update_date) as salesDate")
                .addSelect("SUM(detailsBuy.order) as totalSold")
                .groupBy("detailsBuy.product_id")
                .addGroupBy("salesDate")
                .orderBy("totalSold", "DESC")
                .limit(1)
                .getRawOne();
        });
    }
    static getMostPurchasedHour(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mostPurchasedHour = yield (0, typeorm_1.getRepository)(Purchase_js_1.Purchase)
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
        });
    }
}
exports.StatisticsController = StatisticsController;
//# sourceMappingURL=StatisticsController.js.map