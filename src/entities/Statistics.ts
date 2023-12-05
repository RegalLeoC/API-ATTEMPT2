import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, ManyToOne, JoinColumn} from 'typeorm';
import { Purchase } from './Purchase';
import { Product } from './Product';


@Entity()
export class Statistics extends BaseEntity
{
    @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  revenue: string;

  @Column({length: 50})
  quantity_sold: string;

  @Column('datetime')
  date : Date;

  
  // @ManyToOne(() => Purchase, purchase => purchase.statistics)
  // @JoinColumn({name: "purchase_id"})
  // purchase: Purchase;

  @ManyToOne(() => Product, product => product.statistics)
  @JoinColumn({name: "product_id"})
  product: Product;

  
}

