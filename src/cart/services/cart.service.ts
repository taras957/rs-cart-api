import { Injectable } from '@nestjs/common';
import { Carts as CartEntity } from '../entities/cart.entity';
import { Status } from '../entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from '../dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async findByUserId(id: string): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({
      where: { user_id: id },
      relations: {
        items: true,
      },
    });

    return cart;
  }

  createByUserId(cartDTO: CreateCartDto) {
    const cart: CartEntity = new CartEntity();
    cart.user_id = cartDTO.user_id;
    cart.status = cartDTO.status;

    return this.cartRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string, status?: Status) {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId({
      user_id: userId,
      status,
    });
  }

  async updateByUserId(
    userId: string,
    items: {
      product_id: string;
      count: number;
    }[],
  ) {
    const { id: cart_id, ...cart } = await this.findOrCreateByUserId(userId);

    cart.items = items.map(item => ({ ...item, cart_id }));

    return this.cartRepository.save(cart);
  }

  async removeByUserId(userId: string) {
    return this.cartRepository.delete({ user_id: userId });
  }
}
