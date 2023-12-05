import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PromotionalProduct } from '../entities/PromotionalProduct';

class PromotionalProductController {

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

  async createPromotionalProduct(req: Request, res: Response) {
    try {
      const { name, description, promotions_price, promotion_start_date, promotion_ending_date, promotion_type, product_category, manufacturer, active } = req.body;
  
      if (!name || !description || !promotions_price || !promotion_start_date || !promotion_ending_date || active === undefined || !promotion_type) {
        return res.status(400).json({ error: 'Name, description, promotions_price, promotion_start_date, promotion_ending_date, active, and promotion_type are required' });
      }
  
      const promotionalProductRepository = getRepository(PromotionalProduct);
      const newPromotionalProduct = promotionalProductRepository.create({
        name,
        description,
        promotions_price,
        promotion_start_date: new Date(promotion_start_date),
        promotion_ending_date: new Date(promotion_ending_date),
        active: Boolean(active), // Ensure active is a boolean
        promotion_type,
        product_category,
        manufacturer,
      });
  
      await promotionalProductRepository.save(newPromotionalProduct);
  
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
