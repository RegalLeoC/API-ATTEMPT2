import { BaseEntity } from 'typeorm';
import { DetailsBuy } from './DetailsBuy.js';
export declare class Purchase extends BaseEntity {
    id: number;
    description: string;
    client_name: string;
    last_name: string;
    total_price: number;
    total_products: number;
    create_date: Date;
    create_user: string;
    update_date: Date;
    active: boolean;
    details: DetailsBuy[];
}
