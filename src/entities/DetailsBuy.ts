import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import {Purchase} from './Purchase.js';
import { Product } from './Product.js';

@Entity()
export class DetailsBuy extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({type: 'int'})
  order: number;

  @Column({ length: 50 })
  create_user: string;

  @Column({type: 'timestamp'})
  update_date: Date; 

  @ManyToOne(() => Purchase, (purchase) => purchase.details)
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;

}
