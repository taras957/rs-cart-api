import { Injectable } from '@nestjs/common';
import { Carts as CartEntity } from '../entities/cart.entity';
import { Status } from '../entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { CreateCartDto } from '../dto/cart.dto';
import { CartItems } from '../entities';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItems)
    private readonly cartItemsRepository: Repository<CartItems>,
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

    await this.cartItemsRepository.delete({ cart_id });

    const cartItems = items.map((item) => {
      const cartItem = new CartItems();
      cartItem.product_id = item.product_id;
      cartItem.count = item.count;
      cartItem.cart_id = cart_id;
      this.cartItemsRepository.save(cartItem);
      return cartItem;
    });

    cart.items = cartItems;
    return this.cartRepository.save(cart);
  }

  async removeByUserId(userId: string) {
    return this.cartRepository.delete({ user_id: userId });
  }

  async checkout(userId: string) {
    const cart = await this.cartRepository.findOne({
      where: { user_id: userId },
    });
    if (!cart) {
      throw new Error('Cart does not exist');
    }

    cart.status = Status.ORDERED;

    return this.cartRepository.save(cart);
  }
}
