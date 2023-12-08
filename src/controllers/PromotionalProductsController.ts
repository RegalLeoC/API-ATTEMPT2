import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PromotionalProduct } from '../entities/PromotionalProduct';
import { Product } from '../entities/Product';

class PromotionalProductController {

  private promotionalProductRepository = getRepository(PromotionalProduct);
  private productRepository = getRepository(Product);

  async getAllPromotionalProduct(req: Request, res: Response) {
    try {
      const promotionalProductRepository = getRepository(PromotionalProduct);
      const promotionalProduct = await promotionalProductRepository.find();
      return res.json(promotionalProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getPromotionalProductById(req: Request, res: Response) {
    try {
      const promotionalProductId = parseInt(req.params.id, 10);
      const promotionalProductRepository = getRepository(PromotionalProduct);
      const promotionalproduct = await promotionalProductRepository.findOne({ where: { id: promotionalProductId } });

      if (!promotionalproduct) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(promotionalproduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  createPromotionalProduct = async (req: Request, res: Response) => {
    try {
      const {
        name,
        description,
        promotions_price,
        promotion_start_date,
        promotion_ending_date,
        promotion_type,
        product_category,
        manufacturer,
        active,
        productId,
      } = req.body;

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
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } 

  async updatePromotionalProduct(req: Request, res: Response) {
    try {
      const promotionalProductId = parseInt(req.params.id, 10);
      const promotionalProductRepository = getRepository(PromotionalProduct);
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
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  async deletePromotionalProduct(req: Request, res: Response) {
    try {
      const promotionalProductId = parseInt(req.params.id, 10);
      const promotionalProductRepository = getRepository(PromotionalProduct);
      const promotionalproduct = await promotionalProductRepository.findOne({ where: { id: promotionalProductId } });

      if (!promotionalproduct) {
        return res.status(404).json({ error: 'User not found' });
      }

      await promotionalProductRepository.remove(promotionalproduct);

      return res.json({ message: 'Promotional Product deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new PromotionalProductController();
