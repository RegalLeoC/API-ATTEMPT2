"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StatisticsController_1 = require("../controllers/StatisticsController");
const router = (0, express_1.Router)();
router.get('/statistics/most-sold-product-day', StatisticsController_1.StatisticsController.getMostItemsSoldPerDay);
router.get('/statistics/most-purchased-hour', StatisticsController_1.StatisticsController.getMostPurchasedHour);
exports.default = router;
