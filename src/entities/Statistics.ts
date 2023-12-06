import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, ManyToOne, JoinColumn} from 'typeorm';
import { Purchase } from './Purchase';
import { Product } from './Product';


@Entity()
export class Statistics extends BaseEntity
{
    @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  revenue: number;

  @Column({type: 'int'})
  quantity_sold: number;

  @Column('datetime')
  date : Date;

  @Column({ length: 45 })
  create_user: string;

  
  // @ManyToOne(() => Purchase, purchase => purchase.statistics)
  // @JoinColumn({name: "purchase_id"})
  // purchase: Purchase;

  @ManyToOne(() => Product, product => product.statistics)
  @JoinColumn({name: "product_id"})
  product: Product;

  
}

