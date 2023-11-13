import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DetailsBuy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  product: string;

  @Column({ length: 50 })
  order: string;

  @Column({ length: 50 })
  create_user: string;

  @Column({ length: 45 })
  update_date: string; // Consider using a date/time type
}
