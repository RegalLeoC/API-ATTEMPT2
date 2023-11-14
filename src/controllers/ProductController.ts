// src/controllers/ProductController.ts
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { User } from '../entities/User';
import { FindOneOptions } from 'typeorm';


export default class ProductController {
  static getAllProducts = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    res.json(products);
  };

  static getProductById = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id, 10);
    const productRepository = getRepository(Product);

    const product = await productRepository.findOne({
      where: { id: productId },
    } as FindOneOptions<Product>); // Explicitly specify the type

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  };

  static createProduct = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);
    const userRepository = getRepository(User);
  
    try {
      // Destructure the required fields from the request body
      const { name, description, price, category, maker, stock, measurement, type, Barcode } = req.body;
  
      // Validate input data
      if (!name || !description || !price || !maker || !stock || !measurement || !type || !Barcode) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Assuming you have user information in the request
      const create_user_FK = await userRepository.findOne(req.user.id);
  
      // Create a new product instance
      const newProduct = productRepository.create({
        name,
        description,
        price,
        category,
        maker,
        stock,
        measurement,
        create_user_FK,
        update_user_FK: create_user_FK,
        active: 1, // Set to 1 by default (active)
        type,
        Barcode,
      });
  
      // Save the new product to the database
      const savedProduct = await productRepository.save(newProduct);
  
      // Respond with the created product
      return res.status(201).json(savedProduct);
    } catch (error) {
      // Handle specific errors (e.g., database constraint violations)
      if (error.code === 'SOME_SPECIFIC_ERROR_CODE') {
        return res.status(400).json({ message: 'Validation error' });
      }
  
      // Handle any other errors
      console.error('Error creating product:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  static updateProduct = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);
    const userRepository = getRepository(User);

    const { name, description, price, category, maker, stock, measurement, type, Barcode } = req.body;
    const update_user_FK = await userRepository.findOne(req.user.id); // Assuming you have user information in the request

    await productRepository.update(req.params.id, {
      name,
      description,
      price,
      category,
      maker,
      stock,
      measurement,
      update_user_FK,
      type,
      Barcode,
    });

    const updatedProduct = await productRepository.findOne(req.params.id);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  };

  static deleteProduct = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);
    const deletedProduct = await productRepository.delete(req.params.id);
    if (deletedProduct.affected === 1) {
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  };
}
