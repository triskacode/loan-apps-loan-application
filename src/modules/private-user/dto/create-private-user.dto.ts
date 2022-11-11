import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePrivateUserDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
