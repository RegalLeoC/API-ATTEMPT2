
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Statistics } from './Statistics';

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

  @ManyToOne(() => User, { eager: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'createUserFKId' }) 
  create_user_FK: User;

  @ManyToOne(() => User, { eager: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'updateUserFKId' })
  update_user_FK: User;

  @Column('datetime')
  update_date: Date;

  @Column()
  active: number;

  @Column({ length: 50 })
  type: string;

  @Column({ length: 50 })
  Barcode: string;

  @OneToMany(() => Statistics, statistics => statistics.product)
    statistics: Statistics[];
}
