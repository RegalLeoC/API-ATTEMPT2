import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import {Purchase} from './Purchase';

@Entity()
export class DetailsBuy extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  product: string;

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
