import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './User';

@Entity()
export class Product extends BaseEntity{
  @PrimaryGeneratedColumn()
  idproducts: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  description: string;

  @Column()
  price: number;

  @Column({ length: 50, nullable: true }) // Make category nullable if it's not always applicable
  category: string;

  @Column({ length: 50 })
  maker: string;

  @Column()
  stock: number;

  @Column({ length: 45 })
  measurement: string;

  @Column('datetime')
  create_date: Date;

  @ManyToOne(() => User)
  create_user_FK: User;

  @Column('datetime')
  update_date: Date;

  @ManyToOne(() => User)
  update_user_FK: User;

  @Column()
  active: number;

  @Column({ length: 50 })
  type: string;

  @Column({ length: 50 })
  Barcode: string;
}
