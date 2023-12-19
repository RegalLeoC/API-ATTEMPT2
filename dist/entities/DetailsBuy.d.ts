import { BaseEntity } from 'typeorm';
import { Purchase } from './Purchase.js';
import { Product } from './Product.js';
export declare class DetailsBuy extends BaseEntity {
    id: number;
    product: Product;
    order: number;
    create_user: string;
    update_date: Date;
    purchase: Purchase;
}
