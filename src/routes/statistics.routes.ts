import { Router } from 'express';
import { StatisticsController } from '../controllers/StatisticsController';

const router = Router();

router.get('/statistics/most-sold-product-day', StatisticsController.getMostItemsSoldPerDay);
router.get('/statistics/most-purchased-hour', StatisticsController.getMostPurchasedHour);

export default router;
