"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StatisticsController_js_1 = require("../controllers/StatisticsController.js");
const router = (0, express_1.Router)();
router.get('/statistics/most-sold-product-day', StatisticsController_js_1.StatisticsController.getMostItemsSoldPerDay);
router.get('/statistics/most-purchased-hour', StatisticsController_js_1.StatisticsController.getMostPurchasedHour);
exports.default = router;
//# sourceMappingURL=statistics.routes.js.map