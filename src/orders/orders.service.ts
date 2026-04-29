/** @format */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from './order-status.enum';
import { Order } from './order.entity';
import { RootArea } from './root-area.entity';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(RootArea)
    private rootAreaRepository: Repository<RootArea>,
  ) {}

  async findAll() {
    return this.orderRepository.find({
      relations: ['items', 'rootArea', 'driver'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'rootArea', 'driver'],
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async create(dto: CreateOrderDto) {
    const area = await this.rootAreaRepository.findOneBy({
      id: dto.rootAreaId,
    });

    if (!area) throw new NotFoundException('Root area not found');

    const itemsTotal = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = this.orderRepository.create({
      customerName: dto.customerName,
      customerPhone: dto.customerPhone,
      rootAreaId: dto.rootAreaId,
      deliveryFee: area.deliveryFee,
      itemsTotal: itemsTotal,
      totalPrice: itemsTotal + area.deliveryFee,
      status: OrderStatus.PENDING,
      items: dto.items, // Handled by cascade: true in entity
    });

    return this.orderRepository.save(order);
  }

  async assignDriver(orderId: string, driverId: string) {
    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) throw new NotFoundException('Order not found');

    order.driverId = driverId;
    order.status = OrderStatus.ASSIGNED;

    return this.orderRepository.save(order);
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) throw new NotFoundException('Order not found');

    order.status = status;
    return this.orderRepository.save(order);
  }
}
