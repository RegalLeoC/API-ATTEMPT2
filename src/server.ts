import express from 'express';
import { AppDataSource } from './index.js';
import authenticateJWT from './middleware/authenticationMiddleware.js';
import userRoutes from './routes/user.routes.js';
import PromotionalProductsRoutes from './routes/PromotionalProducts.routes.js'
import purchaseRoutes from './routes/purchase.routes.js';
import statisticsRoutes from './routes/statistics.routes.js';
import productRoutes from './routes/product.routes.js';
import authRoutes from './routes/auth.routes.js';
import 'reflect-metadata';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.then(async (connection) => {

  // connection.clear();

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
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}).catch(error => console.error('Error connecting to supermarket', error));


