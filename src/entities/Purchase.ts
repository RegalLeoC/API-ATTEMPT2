import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Purchase extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  description: string;

  @Column({ length: 45 })
  client_name: string;

  @Column({ length: 45 })
  total_price: string; // Consider using a numeric type

  @Column({ length: 45 })
  total_products: string; // Consider using a numeric type

  @Column('datetime')
  create_date: Date;

  @Column({ length: 45 })
  create_user: string;

  @Column('datetime')
  update_date: Date;

  @Column({ length: 45 })
  active: string;

}
