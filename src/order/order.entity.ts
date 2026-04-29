/** @format */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { RootArea } from './root-area.entity';
import { OrderItem } from './order-item.entity';
import { Driver } from './driver.entity';
import { OrderStatus } from './order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerName: string;

  @Column()
  customerPhone: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  itemsTotal: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  deliveryFee: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalPrice: number;

  @ManyToOne(() => RootArea, (area) => area.orders)
  @JoinColumn({ name: 'rootAreaId' })
  rootArea: RootArea;

  @Column('uuid')
  rootAreaId: string;

  @ManyToOne(() => Driver, (driver) => driver.orders, { nullable: true })
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  @Column('uuid', { nullable: true })
  driverId: string;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
