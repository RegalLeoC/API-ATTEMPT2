import { Request, Response } from 'express';
import { getRepository, DeepPartial } from 'typeorm';
import { Product } from '../entities/Product';
import { User } from '../entities/User';
import { FindOneOptions } from 'typeorm';

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
        type,      // Include 'type' in the creation process
        Barcode,   // Include 'Barcode' in the creation process
        create_user_FK,
        update_user_FK: create_user_FK,
        create_date: new Date(),
        update_date: new Date(),
        active: 1,
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
      const update_user_FK = await userRepository.findOne({
        where: { id: userId },
      } as FindOneOptions<User>);

      if (!update_user_FK) {
        return res.status(404).json({ message: 'User not found for update' });
      }

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
        type,      // Add handling for 'type' column
        Barcode,   // Add handling for 'Barcode' column
      } = req.body;

      existingProduct.name = name || existingProduct.name;
      existingProduct.description = description || existingProduct.description;
      existingProduct.price = price || existingProduct.price;
      existingProduct.category = category || existingProduct.category;
      existingProduct.maker = maker || existingProduct.maker;
      existingProduct.stock = stock || existingProduct.stock;
      existingProduct.measurement = measurement || existingProduct.measurement;
      existingProduct.type = type || existingProduct.type;       // Update 'type' column
      existingProduct.Barcode = Barcode || existingProduct.Barcode; // Update 'Barcode' column
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
      const deletedProduct = await productRepository.delete(req.params.id);

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
}