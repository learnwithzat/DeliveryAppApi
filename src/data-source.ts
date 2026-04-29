import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Order } from './order/order.entity';
import { RootArea } from './order/root-area.entity';
import { OrderItem } from './order/order-item.entity';
import { Driver } from './order/driver.entity';
// Import other entities as they are created

config(); // Load .env

export const AppDataSource = new DataSource({
  type: 'postgres',
  url:
    process.env.DATABASE_URL ||
    'postgresql://postgres:postgres@8100:5432/simpdelivery',
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
