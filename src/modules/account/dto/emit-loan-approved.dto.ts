import { LoanState } from 'src/modules/loan/loan.types';

export class EmitLoanApprovedDto {
  id: number;
  user_id: number;
  amount: number;
  state: LoanState;
}
