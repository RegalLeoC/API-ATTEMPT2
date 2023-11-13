import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class PromotionalProduct extends BaseEntity{
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

  @Column()
  active: number;

  @Column({ length: 50 })
  promotion_hype: string;
}
