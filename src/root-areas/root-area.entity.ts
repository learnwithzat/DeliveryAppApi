/** @format */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class RootArea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('float', { default: 0.0 })
  deliveryFee: number;

  @Column({ nullable: true })
  notes: string;

  @OneToMany(() => Order, (order) => order.rootArea)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;
}
