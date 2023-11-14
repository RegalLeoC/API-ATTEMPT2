// src/controllers/ProductController.ts
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { User } from '../entities/User';

export default class ProductController {
  static getAllProducts = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    res.json(products);
  };

  static getProductById = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  };

  static createProduct = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);
    const userRepository = getRepository(User);

    const { name, description, price, category, maker, stock, measurement, type, Barcode } = req.body;

    const create_user_FK = await userRepository.findOne(req.user.id); // Assuming you have user information in the request

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

    await productRepository.save(newProduct);
    res.json(newProduct);
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
