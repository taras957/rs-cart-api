// entities/cart.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CartItems } from './cart-item.entity';
// enums/status.enum.ts
export enum Status {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity()
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.OPEN,
  })
  status: Status;

  @OneToMany(() => CartItems, (cartItem) => cartItem.cart, {
    onUpdate: 'CASCADE',
  })
  items: CartItems[];
}
