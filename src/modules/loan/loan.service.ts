import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { LoanRepository } from './loan.repository';
import { LoanState } from './loan.types';

@Injectable()
export class LoanService {
  constructor(
    private loanRepository: LoanRepository,
    private accountService: AccountService,
  ) {}

  async create(dto: CreateLoanDto, user_id: number): Promise<Loan> {
    const entity = new Loan();

    entity.user_id = user_id;
    entity.amount = dto.amount;

    return this.loanRepository.create(entity);
  }

  async approve(id: number): Promise<Loan> {
    const entity = await this.loanRepository.findById(id);

    if (!entity) throw new NotFoundException(`Loan with id: ${id} not found`);

    const result = await this.loanRepository.update(entity, {
      state: LoanState.APPROVED,
    });
    this.accountService.emitLoanApproved(result);

    return result;
  }

  async reject(id: number): Promise<Loan> {
    const entity = await this.loanRepository.findById(id);

    if (!entity) throw new NotFoundException(`Loan with id: ${id} not found`);

    const result = await this.loanRepository.update(entity, {
      state: LoanState.REJECTED,
    });

    return result;
  }

  async delete(id: number): Promise<Loan> {
    const entity = await this.loanRepository.findById(id);

    if (!entity) throw new NotFoundException(`Loan with id: ${id} not found`);

    const result = await this.loanRepository.delete(entity);

    return result;
  }

  async findAll(
    filter: Partial<Pick<Loan, 'state' | 'user_id'>>,
  ): Promise<Loan[]> {
    return this.loanRepository.findAll(filter);
  }
}
