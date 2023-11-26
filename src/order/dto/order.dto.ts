import { IsUUID, IsJSON, IsString, IsEnum, IsNumber } from 'class-validator';
import { Order } from '../entities/order.entity';

export class OrderDTO {
  @IsUUID()
  id: string;

  @IsUUID()
  user_id: string;

  @IsUUID()
  cart_id: string;

  @IsJSON()
  payment: any;

  @IsJSON()
  delivery: any;

  @IsString()
  comments: string;

  @IsEnum(['pending', 'completed', 'cancelled'])
  status: string;

  @IsNumber()
  total: number;

  constructor(order: Order) {
    this.id = order.id;
    this.user_id = order.user_id;
    this.cart_id = order.cart_id;
    this.payment = order.payment;
    this.delivery = order.delivery;
    this.comments = order.comments;
    this.status = order.status;
    this.total = order.total;
  }
}
