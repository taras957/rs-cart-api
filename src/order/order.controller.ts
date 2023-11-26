// Import necessary modules from NestJS
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from './services';
import { OrderDTO } from './dto/order.dto';

@Controller('api/profile/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('all')
  async getAllOrder(): Promise<OrderDTO[]> {
    const orders = await this.orderService.getAllOrders();
    return orders;
  }

  @Get(':id')
  async getOrder(@Param('id') id: string): Promise<OrderDTO> {
    const order = await this.orderService.getOrderById(id);
    return order;
  }

  @Post()
  async createOrder(@Body() orderDTO: OrderDTO): Promise<OrderDTO> {
    const createdOrder = await this.orderService.createOrder(orderDTO);
    return createdOrder;
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() orderDTO: OrderDTO,
  ): Promise<OrderDTO> {
    const updatedOrder = await this.orderService.updateOrder(id, orderDTO);
    return updatedOrder;
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<void> {
    await this.orderService.deleteOrder(id);
  }
}
