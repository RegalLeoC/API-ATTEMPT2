// src/app.ts
import express from 'express';
import { AppDataSource } from './index';
import authenticateJWT from './middleware/authenticationMiddleware';
import userRoutes from './routes/user.routes';
import PromotionalProductsRoutes from './routes/PromotionalProducts.routes'
import purchaseRoutes from './routes/purchase.routes';
import statisticsRoutes from './routes/statistics.routes';
import productRoutes from './routes/product.routes';
import authRoutes from './routes/auth.routes'; 


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.then(async (connection) => {
  console.log('Connected to supermarket Database');

  // Apply authentication middleware globally, excluding authRoutes
  app.use('/api', authenticateJWT);

  app.use('/auth', authRoutes);
  app.use('/api', userRoutes);
  app.use('/api', PromotionalProductsRoutes);
  app.use('/api', purchaseRoutes);
  app.use('/api', productRoutes);
  app.use('/api', statisticsRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(error => console.error('Error connecting to supermarket', error));
