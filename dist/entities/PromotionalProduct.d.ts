import { BaseEntity } from 'typeorm';
import { Product } from './Product.js';
export declare class PromotionalProduct extends BaseEntity {
    id: number;
    name: string;
    description: string;
    promotions_price: number;
    promotion_start_date: Date;
    promotion_ending_date: Date;
    active: boolean;
    promotion_type: string;
    product_category: string;
    manufacturer: string;
    created_at: Date;
    updated_at: Date;
    product: Product;
}
