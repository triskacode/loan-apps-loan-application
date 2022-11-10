import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateLoanDto {
  @Min(0)
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  amount: number;
}
