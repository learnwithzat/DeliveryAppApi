import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Order } from './orders/order.entity';
import { RootArea } from './root-areas/root-area.entity';
import { OrderItem } from './orders/order-item.entity';
import { Driver } from './drivers/driver.entity';
// Import other entities as they are created

config(); // Load .env

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false, // Always false for migrations
  logging: true,
  entities: [Order, RootArea, OrderItem, Driver], // You can also use globs like [__dirname + '/../**/*.entity{.ts,.js}']
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  subscribers: [],
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});
