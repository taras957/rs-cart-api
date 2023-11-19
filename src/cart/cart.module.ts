import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts, CartItems } from './entities';

@Module({
  imports: [OrderModule, TypeOrmModule.forFeature([Carts, CartItems])],
  providers: [CartService],
  controllers: [CartController],
  exports: [ CartService ],

})
export class CartModule {}
