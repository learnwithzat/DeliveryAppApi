import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversModule } from './drivers/drivers.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction =
          configService.get<string>('NODE_ENV') === 'production';
        return {
          type: 'postgres',
          url: configService.getOrThrow<string>('DATABASE_URL'),
          // Automatically load entities registered via TypeOrmModule.forFeature()
          autoLoadEntities: true,
          // synchronize: true automatically creates database tables based on your entities.
          synchronize: !isProduction,
          // Path to migration files
          migrations: [__dirname + '/db/migrations/*{.ts,.js}'],
          // Automatically run migrations on app start in production
          migrationsRun: isProduction,
          // Enable SSL in production. rejectUnauthorized: false is often required
          // for cloud providers unless you provide the specific CA certificate.
          ssl: isProduction ? { rejectUnauthorized: false } : false,
        };
      },
    }),
    OrdersModule,
    DriversModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
