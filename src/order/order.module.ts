import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { Carts } from '../cart/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [Carts,TypeOrmModule.forFeature([Order, Carts])],
  providers: [ OrderService ],
  exports: [ OrderService ],
  controllers:[OrderController]
})
export class OrderModule {}
