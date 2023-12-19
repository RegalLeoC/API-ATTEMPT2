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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = require("./index.js");
const authenticationMiddleware_js_1 = __importDefault(require("./middleware/authenticationMiddleware.js"));
const user_routes_js_1 = __importDefault(require("./routes/user.routes.js"));
const PromotionalProducts_routes_js_1 = __importDefault(require("./routes/PromotionalProducts.routes.js"));
const purchase_routes_js_1 = __importDefault(require("./routes/purchase.routes.js"));
const statistics_routes_js_1 = __importDefault(require("./routes/statistics.routes.js"));
const product_routes_js_1 = __importDefault(require("./routes/product.routes.js"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
require("reflect-metadata");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
index_js_1.AppDataSource.then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to supermarket Database');
    app.use('/api', authenticationMiddleware_js_1.default);
    app.use('/auth', auth_routes_js_1.default);
    app.use('/api', user_routes_js_1.default);
    app.use('/api', PromotionalProducts_routes_js_1.default);
    app.use('/api', purchase_routes_js_1.default);
    app.use('/api', product_routes_js_1.default);
    app.use('/api', statistics_routes_js_1.default);
    app.listen(PORT, () => {
        console.log(`Server is running on http://0.0.0.0:${PORT}`);
    });
})).catch(error => console.error('Error connecting to supermarket', error));
//# sourceMappingURL=server.js.map