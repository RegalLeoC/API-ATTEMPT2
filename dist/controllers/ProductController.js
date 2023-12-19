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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Product_js_1 = require("../entities/Product.js");
const User_js_1 = require("../entities/User.js");
const PromotionalProduct_js_1 = require("../entities/PromotionalProduct.js");
class ProductController {
}
_a = ProductController;
ProductController.getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = (0, typeorm_1.getRepository)(Product_js_1.Product);
    try {
        const filterOptions = {};
        if (req.query.category) {
            filterOptions.category = req.query.category;
        }
        const products = yield productRepository.find({
            where: filterOptions,
            relations: ['create_user_FK', 'update_user_FK'],
        });
        return res.json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
ProductController.getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(req.params.id, 10);
    const productRepository = (0, typeorm_1.getRepository)(Product_js_1.Product);
    try {
        const product = yield productRepository.findOne({
            where: { idproducts: productId },
            relations: ['create_user_FK', 'update_user_FK'],
        });
        if (product) {
            return res.json(product);
        }
        else {
            return res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        console.error('Error fetching product by ID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
ProductController.createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = (0, typeorm_1.getRepository)(Product_js_1.Product);
    const userRepository = (0, typeorm_1.getRepository)(User_js_1.User);
    try {
        const { name, description, price, category, maker, stock, measurement, userId, type, Barcode, } = req.body;
        if (!name || !description || !price || !maker || !stock || !measurement || !userId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const userIdInt = parseInt(userId, 10);
        if (isNaN(userIdInt)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const create_user_FK = yield userRepository.findOne({
            where: { id: userIdInt },
        });
        if (!create_user_FK) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newProduct = productRepository.create({
            name,
            description,
            price,
            category,
            maker,
            stock,
            measurement,
            type,
            Barcode,
            create_user_FK,
            update_user_FK: create_user_FK,
            create_date: new Date(),
            update_date: new Date(),
            active: true,
        });
        const savedProduct = yield productRepository.save(newProduct);
        const productWithUserData = yield productRepository.findOne({
            where: { idproducts: savedProduct.idproducts },
            relations: ['create_user_FK', 'update_user_FK'],
        });
        return res.status(201).json(productWithUserData);
    }
    catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
ProductController.updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = (0, typeorm_1.getRepository)(Product_js_1.Product);
    const userRepository = (0, typeorm_1.getRepository)(User_js_1.User);
    try {
        const userId = parseInt(req.params.id, 10);
        const productId = parseInt(req.params.id, 10);
        const existingProduct = yield productRepository.findOne({
            where: { idproducts: productId },
        });
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const { name, description, price, category, maker, stock, measurement, type, Barcode, updateUserId, } = req.body;
        const updateUserIdInt = parseInt(updateUserId, 10);
        if (isNaN(updateUserIdInt)) {
            return res.status(400).json({ message: 'Invalid update user ID' });
        }
        const update_user_FK = yield userRepository.findOne({
            where: { id: updateUserIdInt },
        });
        if (!update_user_FK) {
            return res.status(404).json({ message: 'Update user not found' });
        }
        existingProduct.name = name || existingProduct.name;
        existingProduct.description = description || existingProduct.description;
        existingProduct.price = price || existingProduct.price;
        existingProduct.category = category || existingProduct.category;
        existingProduct.maker = maker || existingProduct.maker;
        existingProduct.stock = stock || existingProduct.stock;
        existingProduct.measurement = measurement || existingProduct.measurement;
        existingProduct.type = type || existingProduct.type;
        existingProduct.Barcode = Barcode || existingProduct.Barcode;
        existingProduct.update_user_FK = update_user_FK;
        yield productRepository.save(existingProduct);
        return res.json(existingProduct);
    }
    catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
ProductController.deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = (0, typeorm_1.getRepository)(Product_js_1.Product);
    try {
        const productId = parseInt(req.params.id, 10);
        const deletedProduct = yield productRepository.delete(productId);
        if (deletedProduct.affected === 1) {
            return res.json({ message: 'Product deleted successfully' });
        }
        else {
            return res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
ProductController.createPromotionalProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = (0, typeorm_1.getRepository)(Product_js_1.Product);
    const promotionalProductRepository = (0, typeorm_1.getRepository)(PromotionalProduct_js_1.PromotionalProduct);
    try {
        const { productId, name, description, promotions_price, promotion_start_date, promotion_ending_date, promotion_type, product_category, manufacturer, active } = req.body;
        if (!productId || !name || !description || !promotions_price || !promotion_start_date || !promotion_ending_date || active === undefined || !promotion_type) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const product = yield productRepository.findOne(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const newPromotionalProduct = promotionalProductRepository.create({
            name,
            description,
            promotions_price,
            promotion_start_date,
            promotion_ending_date,
            active,
            promotion_type,
            product,
        });
        yield promotionalProductRepository.save(newPromotionalProduct);
        return res.status(201).json(newPromotionalProduct);
    }
    catch (error) {
        console.error('Error creating promotional product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.default = ProductController;
//# sourceMappingURL=ProductController.js.map