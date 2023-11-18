import { IsNotEmpty, IsString } from 'class-validator';
import { Status } from '../entities/cart.entity';

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  status: Status;
}
