import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PromotionalProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  description: string;

  @Column()
  promotions_price: number;

  @Column('datetime')
  promotion_start_date: Date;

  @Column('datetime')
  promotion_ending_date: Date;

  @Column({ type: 'boolean', default: true }) // Change to boolean with a default value of true
  active: boolean;

  @Column({ length: 50, name: 'promotion_type' })
  promotion_type: string;

  @Column({ length: 50, name: 'product_category' })
  product_category: string;

  @Column({ length: 50, name: 'manufacturer' })
  manufacturer: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
