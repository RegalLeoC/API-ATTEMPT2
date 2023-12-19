import { BaseEntity } from 'typeorm';
import { Product } from './Product.js';
export declare class Statistics extends BaseEntity {
    id: number;
    quantitySold: number;
    purchaseDate: Date;
    product: Product;
}
