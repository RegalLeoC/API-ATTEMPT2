"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const index_1 = require("./index");
const authenticationMiddleware_1 = __importDefault(require("./middleware/authenticationMiddleware"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const PromotionalProducts_routes_1 = __importDefault(require("./routes/PromotionalProducts.routes"));
const purchase_routes_1 = __importDefault(require("./routes/purchase.routes"));
const statistics_routes_1 = __importDefault(require("./routes/statistics.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
index_1.AppDataSource.then(async (connection) => {
    console.log('Connected to supermarket Database');
    // Apply authentication middleware globally, excluding authRoutes
    app.use('/api', authenticationMiddleware_1.default);
    app.use('/auth', auth_routes_1.default);
    app.use('/api', user_routes_1.default);
    app.use('/api', PromotionalProducts_routes_1.default);
    app.use('/api', purchase_routes_1.default);
    app.use('/api', product_routes_1.default);
    app.use('/api', statistics_routes_1.default);
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => console.error('Error connecting to supermarket', error));
