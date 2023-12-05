import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn} from 'typeorm';
import {DetailsBuy} from './DetailsBuy';
import { Statistics } from './Statistics';

@Entity( {name: 'purchase'})
export class Purchase extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  description: string;

  @Column({ length: 45 })
  client_name: string;

  @Column({ length: 45 })
  last_name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  total_price: number; // Consider using a numeric type

  @Column({ type: 'int' })
  total_products: number; 

  @Column({type: 'timestamp'})
  create_date: Date;

  @Column({ length: 45 })
  create_user: string;

  @Column({type: 'timestamp'})
  update_date: Date;

  @Column({ type: 'boolean'})
  active: boolean;

  @OneToMany(() => DetailsBuy, (detailsBuy) => detailsBuy.purchase, { cascade: true })
  @JoinColumn()
  details: DetailsBuy[];


  // @OneToMany(() => Statistics, statistics => statistics.product)
  // statistics: Statistics[];

}


