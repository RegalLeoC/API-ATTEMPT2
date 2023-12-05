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
      const { name, description, promotions_price, promotion_start_date, promotion_ending_date, promotion_hype } = req.body;

      if (!name || !description || !promotions_price || !promotion_start_date || !promotion_ending_date || !promotion_hype) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const promotionalProductRepository = getRepository(PromotionalProduct);
      const newPromotionalProduct = promotionalProductRepository.create({
        name,
        description,
        promotions_price, // Note: In a real-world scenario, you should hash the password before saving it.
        promotion_start_date: new Date(),
        promotion_ending_date: new Date(),
        active: 1,
        promotion_hype, // Assuming 1 means active
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
        return res.status(404).json({ error: 'User not found' });
      }

      // Update user properties based on your requirements
      promotionalproduct.name = req.body.name || promotionalproduct.name;
      promotionalproduct.description = req.body.description || promotionalproduct.description;
      promotionalproduct.promotions_price = req.body.promotions_price || promotionalproduct.promotions_price;
      promotionalproduct.promotion_start_date = new Date();
      promotionalproduct.promotion_ending_date = new Date();
      promotionalproduct.promotion_hype = req.body.promotion_hype || promotionalproduct.promotion_hype;

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

      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new PromotionalProductController();
