import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, ManyToOne, JoinColumn} from 'typeorm';
import { Purchase } from './Purchase';
import { Product } from './Product';


@Entity()
export class Statistics extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantitySold: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  purchaseDate: Date;

  @ManyToOne(() => Product, product => product.statistics)
  @JoinColumn({ name: 'productId' })
  product: Product;

  
}

