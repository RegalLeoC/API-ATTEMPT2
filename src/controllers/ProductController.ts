import { Request, Response } from 'express';
import { getRepository, DeepPartial } from 'typeorm';
import { Product } from '../entities/Product';
import { User } from '../entities/User';
import { FindOneOptions } from 'typeorm';
import { PromotionalProduct } from '../entities/PromotionalProduct';

export default class ProductController {
  static getAllProducts = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);

    try {
      const filterOptions: any = {};
      if (req.query.category) {
        filterOptions.category = req.query.category;
      }

      const products = await productRepository.find({
        where: filterOptions,
        relations: ['create_user_FK', 'update_user_FK'],
      });

      return res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  static getProductById = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id, 10);
    const productRepository = getRepository(Product);

    try {
      const product = await productRepository.findOne({
        where: { idproducts: productId },
        relations: ['create_user_FK', 'update_user_FK'],
      });

      if (product) {
        return res.json(product);
      } else {
        return res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  static createProduct = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);
    const userRepository = getRepository(User);

    try {
      const {
        name,
        description,
        price,
        category,
        maker,
        stock,
        measurement,
        userId,
        type,      // Add handling for 'type' column
        Barcode,   // Add handling for 'Barcode' column
      } = req.body;

      if (!name || !description || !price || !maker || !stock || !measurement || !userId) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const userIdInt = parseInt(userId, 10);
      if (isNaN(userIdInt)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const create_user_FK = await userRepository.findOne({
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
      } as DeepPartial<Product>);

      const savedProduct = await productRepository.save(newProduct);

      const productWithUserData = await productRepository.findOne({
        where: { idproducts: savedProduct.idproducts },
        relations: ['create_user_FK', 'update_user_FK'],
      } as FindOneOptions<Product>);

      return res.status(201).json(productWithUserData);
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  static updateProduct = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);
    const userRepository = getRepository(User);
  
    try {
      const userId = parseInt(req.params.id, 10);
      const productId = parseInt(req.params.id, 10);
  
      const existingProduct = await productRepository.findOne({
        where: { idproducts: productId },
      });
  
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const {
        name,
        description,
        price,
        category,
        maker,
        stock,
        measurement,
        type,
        Barcode,
        updateUserId, // Include the update user ID in the request body
      } = req.body;
  
      // Check if updateUserId is a valid integer
      const updateUserIdInt = parseInt(updateUserId, 10);
      if (isNaN(updateUserIdInt)) {
        return res.status(400).json({ message: 'Invalid update user ID' });
      }
  
      // Check if the update user exists
      const update_user_FK = await userRepository.findOne({
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
  
      await productRepository.save(existingProduct);
  
      return res.json(existingProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  static deleteProduct = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);

    try {
      const productId = parseInt(req.params.id, 10);
      const deletedProduct = await productRepository.delete(productId);

      if (deletedProduct.affected === 1) {
        return res.json({ message: 'Product deleted successfully' });
      } else {
        return res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  static createPromotionalProduct = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);
    const promotionalProductRepository = getRepository(PromotionalProduct);

    try {
      const { productId, name, description, promotions_price, promotion_start_date, promotion_ending_date, promotion_type, product_category, manufacturer, active } = req.body;

      if (!productId || !name || !description || !promotions_price || !promotion_start_date || !promotion_ending_date || active === undefined || !promotion_type) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const product = await productRepository.findOne(productId);

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

      await promotionalProductRepository.save(newPromotionalProduct);

      return res.status(201).json(newPromotionalProduct);
    } catch (error) {
      console.error('Error creating promotional product:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

  };







}
