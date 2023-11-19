import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { Carts, CartItems } from './cart/entities';
import { ConfigModule } from '@nestjs/config';
import { Order } from './order/entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASS,
      username: process.env.DB_USER,
      entities: [Carts, CartItems, Order],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
