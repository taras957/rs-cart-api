import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDTO } from '../dto/order.dto';
import { Carts as CartEntity } from '../../cart/entities';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async getAllOrders() {
    return await this.orderRepository.find();
  }

  async getOrderById(id: string): Promise<OrderDTO> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return new OrderDTO(order);
  }

  async createOrder(orderDTO: OrderDTO): Promise<OrderDTO> {
    const createdOrder = await this.orderRepository.save(orderDTO);

    return new OrderDTO(createdOrder);
  }

  async updateOrder(id: string, orderDTO: OrderDTO): Promise<OrderDTO> {
    const existingOrder = await this.orderRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const updatedOrder = await this.orderRepository.save({
      ...existingOrder,
      ...orderDTO,
    });
    return new OrderDTO(updatedOrder);
  }

  async deleteOrder(id: string): Promise<void> {
    const result = await this.orderRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
