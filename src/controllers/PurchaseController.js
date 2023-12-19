"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Purchase_1 = require("../entities/Purchase");
const typeorm_1 = require("typeorm");
const DetailsBuy_1 = require("../entities/DetailsBuy");
const Product_1 = require("../entities/Product");
class PurchaseController {
    async getPurchases(req, res) {
        try {
            const purchaseRepository = (0, typeorm_1.getRepository)(Purchase_1.Purchase);
            const purchases = await purchaseRepository.find({
                relations: ['details', 'details.product'],
            });
            const purchasesWithProductDetails = purchases.map((purchase) => {
                const productDetails = purchase.details?.map((detail) => ({
                    id: detail.id,
                    product: detail.product
                        ? {
                            id: detail.product.idproducts,
                            name: detail.product.name,
                            // Add other properties you want to include
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
    }
    async getPurchaseById(req, res) {
        try {
            const purchaseId = parseInt(req.params.id, 10);
            const purchaseRepository = (0, typeorm_1.getRepository)(Purchase_1.Purchase);
            const purchase = await purchaseRepository.findOne({
                where: { id: purchaseId },
                relations: ['details', 'details.product'],
            });
            if (!purchase) {
                return res.status(404).json({ error: 'Purchase Not Found' });
            }
            const productDetails = purchase.details?.map((detail) => ({
                id: detail.id,
                product: detail.product
                    ? {
                        id: detail.product.idproducts,
                        name: detail.product.name,
                        // Add other properties you want to include
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
    }
    async createPurchase(req, res) {
        try {
            const { description, client_name, last_name, total_price, total_products, create_user, active, details, } = req.body;
            // Data validation
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
            // Validate product IDs in details
            const productRepository = (0, typeorm_1.getRepository)(Product_1.Product);
            const isValidProduct = async (productId) => {
                const product = await productRepository.findOne({
                    where: { idproducts: productId },
                    select: ['idproducts'],
                });
                return !!product;
            };
            const areAllProductsValid = await Promise.all(details.map((detail) => isValidProduct(detail.product)));
            if (!areAllProductsValid.every((isValid) => isValid)) {
                return res.status(400).json({
                    error: 'One or more product IDs in the details are invalid',
                });
            }
            // Date handling
            const create_date = new Date();
            const update_date = new Date();
            const purchaseRepository = (0, typeorm_1.getRepository)(Purchase_1.Purchase);
            const detailsBuyRepository = (0, typeorm_1.getRepository)(DetailsBuy_1.DetailsBuy);
            // Create purchase entity
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
            // Save purchase entity to get its ID
            await purchaseRepository.save(newPurchase);
            // Create and associate DetailsBuy entities
            const detailsBuyEntities = details.map((detail) => detailsBuyRepository.create({
                product: detail.product,
                order: newPurchase.id,
                create_user: detail.create_user,
                update_date: new Date(),
                purchase: newPurchase,
            }));
            // Save DetailsBuy entities
            await detailsBuyRepository.save(detailsBuyEntities);
            return res.status(201).json(newPurchase);
        }
        catch (err) {
            console.error('Error caught:', err);
            return res.status(500).json({ err: 'Internal Server Error' });
        }
    }
}
exports.default = new PurchaseController();
