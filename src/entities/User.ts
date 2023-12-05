import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 45 })
  email: string;

  @Column({ length: 45 })
  password: string;

  @Column('datetime')
  create_date: Date;

  @Column('datetime')
  create_user: Date;

  @Column('datetime')
  update_date: Date;

  @Column()
  active: number;

  @Column()
  age: number;

  @Column()
  phone_number: number;

}

