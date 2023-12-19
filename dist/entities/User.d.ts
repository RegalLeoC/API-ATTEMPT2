import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    create_date: Date;
    create_user: Date;
    update_date: Date;
    active: boolean;
    age: number;
    phone_number: number;
}
