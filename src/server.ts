import express from "express";
import { AppDataSource } from './index'
import userRoutes from './routes/user.routes';
import { User } from './entities/User';
import PromotionalProductsRoutes from './routes/PromotionalProducts.routes'
import { PromotionalProduct } from "./entities/PromotionalProduct";

import purchaseRoutes from './routes/purchase.routes';
import statisticsRoutes from './routes/statistics.routes';
import productRoutes from './routes/product.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.then(async(connection) => {
    console.log('Connected to supermarket Database')

    app.use('/api', userRoutes);
    app.use('/api', PromotionalProductsRoutes);
    app.use('/api', purchaseRoutes);
    app.use('/api', statisticsRoutes);
    app.use('/api', productRoutes);


    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    });
}).catch(error => console.error('Error connecting to supermarket', error));