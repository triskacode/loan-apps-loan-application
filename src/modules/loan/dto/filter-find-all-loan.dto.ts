import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { LoanState } from '../loan.types';

export class FilterFindAllLoanDto {
  @IsEnum(LoanState)
  @IsOptional()
  @Transform(({ value }) =>
    value !== null && value !== undefined && value !== '' ? value : undefined,
  )
  state: LoanState;
}
