import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Carts } from '../../cart/entities';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => Carts, { nullable: false }) 
  @JoinColumn({ name: 'cart_id' })
  cart: Carts;

  @Column('json')
  payment: any; 

  @Column('json')
  delivery: any; 
  @Column('text')
  comments: string;

  @Column({ type: 'enum', enum: ['pending', 'completed', 'cancelled'] })
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column('uuid')
  cart_id: string; 
}
