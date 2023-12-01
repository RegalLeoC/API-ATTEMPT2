import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,CreateDateColumn, UpdateDateColumn} from 'typeorm';


@Entity()
export class Statistics extends BaseEntity
{
    @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  purchase_id: string;

  @Column({ length: 50 })
  product_id: string;

  @Column({ length: 50 })
  revenue: string;

  @Column({length: 50})
  quantity_sold: string;

  @Column('datetime')
  date : Date;
}

