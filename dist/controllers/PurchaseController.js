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
const Purchase_js_1 = require("../entities/Purchase.js");
const typeorm_1 = require("typeorm");
const DetailsBuy_js_1 = require("../entities/DetailsBuy.js");
const Product_js_1 = require("../entities/Product.js");
class PurchaseController {
    getPurchases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchaseRepository = (0, typeorm_1.getRepository)(Purchase_js_1.Purchase);
                const purchases = yield purchaseRepository.find({
                    relations: ['details', 'details.product'],
                });
                const purchasesWithProductDetails = purchases.map((purchase) => {
                    var _a;
                    const productDetails = (_a = purchase.details) === null || _a === void 0 ? void 0 : _a.map((detail) => ({
                        id: detail.id,
                        product: detail.product
                            ? {
                                id: detail.product.idproducts,
                                name: detail.product.name,
                            }
                            : null,
                        order: detail.order,
                        create_user: detail.create_user,
                        update_date: detail.update_date,
                    }));
                    return {
                        id: purchase.id,
                        description: purchase.description,
                        client_name: purchase.client_name,
                        last_name: purchase.last_name,
                        total_price: purchase.total_price,
                        total_products: purchase.total_products,
                        create_date: purchase.create_date,
                        create_user: purchase.create_user,
                        update_date: purchase.update_date,
                        active: purchase.active,
                        details: productDetails,
                    };
                });
                return res.json(purchasesWithProductDetails);
            }
            catch (err) {
                console.error('Error caught:', err);
                return res.status(500).json({ err: 'Internal Server Error' });
            }
        });
    }
    getPurchaseById(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchaseId = parseInt(req.params.id, 10);
                const purchaseRepository = (0, typeorm_1.getRepository)(Purchase_js_1.Purchase);
                const purchase = yield purchaseRepository.findOne({
                    where: { id: purchaseId },
                    relations: ['details', 'details.product'],
                });
                if (!purchase) {
                    return res.status(404).json({ error: 'Purchase Not Found' });
                }
                const productDetails = (_a = purchase.details) === null || _a === void 0 ? void 0 : _a.map((detail) => ({
                    id: detail.id,
                    product: detail.product
                        ? {
                            id: detail.product.idproducts,
                            name: detail.product.name,
                        }
                        : null,
                    order: detail.order,
                    create_user: detail.create_user,
                    update_date: detail.update_date,
                }));
                const purchaseWithProductDetails = {
                    id: purchase.id,
                    description: purchase.description,
                    client_name: purchase.client_name,
                    last_name: purchase.last_name,
                    total_price: purchase.total_price,
                    total_products: purchase.total_products,
                    create_date: purchase.create_date,
                    create_user: purchase.create_user,
                    update_date: purchase.update_date,
                    active: purchase.active,
                    details: productDetails,
                };
                return res.json(purchaseWithProductDetails);
            }
            catch (err) {
                console.error('Error caught:', err);
                return res.status(500).json({ err: 'Internal Server Error PurchaseID' });
            }
        });
    }
    createPurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, client_name, last_name, total_price, total_products, create_user, active, details, } = req.body;
                if (!description ||
                    !client_name ||
                    !last_name ||
                    isNaN(total_price) ||
                    isNaN(total_products) ||
                    typeof active !== 'boolean' ||
                    !details) {
                    return res.status(400).json({
                        error: 'Invalid or missing data in the request body',
                    });
                }
                const productRepository = (0, typeorm_1.getRepository)(Product_js_1.Product);
                const isValidProduct = (productId) => __awaiter(this, void 0, void 0, function* () {
                    const product = yield productRepository.findOne({
                        where: { idproducts: productId },
                        select: ['idproducts'],
                    });
                    return !!product;
                });
                const areAllProductsValid = yield Promise.all(details.map((detail) => isValidProduct(detail.product)));
                if (!areAllProductsValid.every((isValid) => isValid)) {
                    return res.status(400).json({
                        error: 'One or more product IDs in the details are invalid',
                    });
                }
                const create_date = new Date();
                const update_date = new Date();
                const purchaseRepository = (0, typeorm_1.getRepository)(Purchase_js_1.Purchase);
                const detailsBuyRepository = (0, typeorm_1.getRepository)(DetailsBuy_js_1.DetailsBuy);
                const newPurchase = purchaseRepository.create({
                    description,
                    client_name,
                    last_name,
                    total_price,
                    total_products,
                    create_date,
                    create_user,
                    update_date,
                    active,
                });
                yield purchaseRepository.save(newPurchase);
                const detailsBuyEntities = details.map((detail) => detailsBuyRepository.create({
                    product: detail.product,
                    order: newPurchase.id,
                    create_user: detail.create_user,
                    update_date: new Date(),
                    purchase: newPurchase,
                }));
                yield detailsBuyRepository.save(detailsBuyEntities);
                return res.status(201).json(newPurchase);
            }
            catch (err) {
                console.error('Error caught:', err);
                return res.status(500).json({ err: 'Internal Server Error' });
            }
        });
    }
}
exports.default = new PurchaseController();
//# sourceMappingURL=PurchaseController.js.map