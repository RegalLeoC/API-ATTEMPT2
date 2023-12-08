// Product.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Statistics } from './Statistics';
import { PromotionalProduct } from './PromotionalProduct';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  idproducts: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  description: string;

  @Column()
  price: number;

  @Column({ length: 50, nullable: true })
  category: string;

  @Column({ length: 50 })
  maker: string;

  @Column()
  stock: number;

  @Column({ length: 45 })
  measurement: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @ManyToOne(() => User, { eager: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'createUserFKId' })
  create_user_FK: User;

  @ManyToOne(() => User, { eager: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'updateUserFKId' })
  update_user_FK: User;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  update_date: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ length: 50 })
  type: string;

  @Column({ length: 50 })
  Barcode: string;

  @OneToMany(() => Statistics, statistics => statistics.product)
  statistics: Statistics[];

  @OneToMany(() => PromotionalProduct, promotionalProduct => promotionalProduct.product, { onDelete: 'CASCADE' })
  promotions: PromotionalProduct[]; 


}
