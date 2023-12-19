"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const PromotionalProduct_1 = require("../entities/PromotionalProduct");
const Product_1 = require("../entities/Product");
class PromotionalProductController {
    constructor() {
        this.promotionalProductRepository = (0, typeorm_1.getRepository)(PromotionalProduct_1.PromotionalProduct);
        this.productRepository = (0, typeorm_1.getRepository)(Product_1.Product);
        this.createPromotionalProduct = async (req, res) => {
            try {
                const { name, description, promotions_price, promotion_start_date, promotion_ending_date, promotion_type, product_category, manufacturer, active, productId, } = req.body;
                // Check if productId is provided and is a valid integer
                if (!productId || isNaN(productId)) {
                    return res.status(400).json({ error: 'Invalid product ID' });
                }
                // Find the product by ID
                const product = await this.productRepository.findOne({ where: { idproducts: productId } });
                // Check if the product exists
                if (!product) {
                    return res.status(404).json({ error: 'Product not found' });
                }
                const newPromotionalProduct = this.promotionalProductRepository.create({
                    name,
                    description,
                    promotions_price,
                    promotion_start_date,
                    promotion_ending_date,
                    active,
                    promotion_type,
                    product_category,
                    manufacturer,
                    product,
                });
                await this.promotionalProductRepository.save(newPromotionalProduct);
                return res.status(201).json(newPromotionalProduct);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        };
    }
    async getAllPromotionalProducts(req, res) {
        try {
            const promotionalProductRepository = (0, typeorm_1.getRepository)(PromotionalProduct_1.PromotionalProduct);
            const promotionalProducts = await promotionalProductRepository
                .createQueryBuilder('promotionalProduct')
                .leftJoinAndSelect('promotionalProduct.product', 'product')
                .select([
                'promotionalProduct.id',
                'promotionalProduct.name',
                'promotionalProduct.description',
                'promotionalProduct.promotions_price',
                'promotionalProduct.promotion_start_date',
                'promotionalProduct.promotion_ending_date',
                'promotionalProduct.active',
                'promotionalProduct.promotion_type',
                'promotionalProduct.product_category',
                'promotionalProduct.manufacturer',
                'promotionalProduct.created_at',
                'promotionalProduct.updated_at',
                'product.idproducts',
                'product.price',
                'product.category',
                'product.maker',
                'product.stock',
                'product.measurement',
                'product.type',
                'product.Barcode',
            ])
                .getMany();
            const formattedPromotionalProducts = promotionalProducts.map(promotionalProduct => ({
                id: promotionalProduct.id,
                name: promotionalProduct.name,
                description: promotionalProduct.description,
                promotions_price: promotionalProduct.promotions_price,
                promotion_start_date: promotionalProduct.promotion_start_date,
                promotion_ending_date: promotionalProduct.promotion_ending_date,
                active: promotionalProduct.active,
                promotion_type: promotionalProduct.promotion_type,
                product_category: promotionalProduct.product_category,
                manufacturer: promotionalProduct.manufacturer,
                created_at: promotionalProduct.created_at,
                updated_at: promotionalProduct.updated_at,
                product: promotionalProduct.product ? {
                    idproducts: promotionalProduct.product.idproducts,
                    price: promotionalProduct.product.price,
                    category: promotionalProduct.product.category,
                    maker: promotionalProduct.product.maker,
                    stock: promotionalProduct.product.stock,
                    measurement: promotionalProduct.product.measurement,
                    type: promotionalProduct.product.type,
                    Barcode: promotionalProduct.product.Barcode,
                } : null,
            }));
            return res.json(formattedPromotionalProducts);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getPromotionalProductById(req, res) {
        try {
            const promotionalProductRepository = (0, typeorm_1.getRepository)(PromotionalProduct_1.PromotionalProduct);
            const { id } = req.params;
            const promotionalProduct = await promotionalProductRepository
                .createQueryBuilder('promotionalProduct')
                .leftJoinAndSelect('promotionalProduct.product', 'product')
                .leftJoinAndSelect('product.create_user_FK', 'createUser')
                .leftJoinAndSelect('product.update_user_FK', 'updateUser')
                .select([
                'promotionalProduct.id',
                'promotionalProduct.name',
                'promotionalProduct.description',
                'promotionalProduct.promotions_price',
                'promotionalProduct.promotion_start_date',
                'promotionalProduct.promotion_ending_date',
                'promotionalProduct.active',
                'promotionalProduct.promotion_type',
                'promotionalProduct.product_category',
                'promotionalProduct.manufacturer',
                'promotionalProduct.created_at',
                'promotionalProduct.updated_at',
                'product.name AS productName',
                'product.idproducts',
                'product.description AS productDescription',
                'product.price',
                'product.category',
                'product.maker',
                'product.stock',
                'product.measurement',
                'product.create_date AS product_create_date',
                'product.update_date AS product_update_date',
                'product.active AS product_active',
                'product.type',
                'product.Barcode',
                'createUser.id AS product_createUserFKId',
                'createUser.name AS product_createUserName',
                'updateUser.id AS product_updateUserFKId',
                'updateUser.name AS product_updateUserName',
            ])
                .where('promotionalProduct.id = :id', { id: parseInt(id, 10) })
                .getOne();
            if (!promotionalProduct) {
                return res.status(404).json({ error: 'Promotional product not found' });
            }
            return res.status(200).json(promotionalProduct);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async updatePromotionalProduct(req, res) {
        try {
            const promotionalProductId = parseInt(req.params.id, 10);
            const promotionalProductRepository = (0, typeorm_1.getRepository)(PromotionalProduct_1.PromotionalProduct);
            const promotionalproduct = await promotionalProductRepository.findOne({ where: { id: promotionalProductId } });
            if (!promotionalproduct) {
                return res.status(404).json({ error: 'Promotional product not found' });
            }
            // Update product properties based on your requirements
            promotionalproduct.name = req.body.name || promotionalproduct.name;
            promotionalproduct.description = req.body.description || promotionalproduct.description;
            promotionalproduct.promotions_price = req.body.promotions_price || promotionalproduct.promotions_price;
            promotionalproduct.promotion_start_date = new Date(req.body.promotion_start_date) || promotionalproduct.promotion_start_date;
            promotionalproduct.promotion_ending_date = new Date(req.body.promotion_ending_date) || promotionalproduct.promotion_ending_date;
            promotionalproduct.promotion_type = req.body.promotion_type || promotionalproduct.promotion_type;
            promotionalproduct.product_category = req.body.product_category || promotionalproduct.product_category;
            promotionalproduct.manufacturer = req.body.manufacturer || promotionalproduct.manufacturer;
            promotionalproduct.active = Boolean(req.body.active); // Ensure active is a boolean
            await promotionalProductRepository.save(promotionalproduct);
            return res.json(promotionalproduct);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async deletePromotionalProduct(req, res) {
        try {
            const promotionalProductId = parseInt(req.params.id, 10);
            const promotionalProductRepository = (0, typeorm_1.getRepository)(PromotionalProduct_1.PromotionalProduct);
            const promotionalproduct = await promotionalProductRepository.findOne({ where: { id: promotionalProductId } });
            if (!promotionalproduct) {
                return res.status(404).json({ error: 'User not found' });
            }
            await promotionalProductRepository.remove(promotionalproduct);
            return res.json({ message: 'Promotional Product deleted successfully' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.default = new PromotionalProductController();
