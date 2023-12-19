import { BaseEntity } from 'typeorm';
import { User } from './User.js';
import { Statistics } from './Statistics.js';
import { PromotionalProduct } from './PromotionalProduct.js';
export declare class Product extends BaseEntity {
    idproducts: number;
    name: string;
    description: string;
    price: number;
    category: string;
    maker: string;
    stock: number;
    measurement: string;
    create_date: Date;
    create_user_FK: User;
    update_user_FK: User;
    update_date: Date;
    active: boolean;
    type: string;
    Barcode: string;
    statistics: Statistics[];
    promotions: PromotionalProduct[];
}
