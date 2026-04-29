/** @format */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Order, (order) => order.driver)
  orders: Order[];
}
