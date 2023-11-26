import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  HttpStatus,
  Query,
} from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';

import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  @Get('all')
  async carts() {
    const carts = await this.cartService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { carts },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Query('userId') userId: string) {
    const cart = await this.cartService.findOrCreateByUserId(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Query('userId') userId: string, @Body() body) {
    try {
      const cart = await this.cartService.updateByUserId(userId, body);

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: {
          cart,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Server Error',
      };
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Query('userId') userId: string) {
    try {
      await this.cartService.removeByUserId(userId);

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Server Error',
      };
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(@Query('userId') userId: string, @Body() body) {
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cart is empty',
      };
    }

    const { id: cartId, items } = cart;
    const order = await this.orderService.createOrder({
      ...body,
      userId,
      cartId,
      items,
    });

    this.cartService.checkout(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order, cart },
    };
  }
}
