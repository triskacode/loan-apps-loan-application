import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/user';
import { AccountService } from '../account/account.service';
import { PrivateUser } from '../private-user/entities/private-user.entity';
import { PrivateUserRepository } from '../private-user/private-user.repository';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { LoanRepository } from './loan.repository';
import { LoanState } from './loan.types';

@Injectable()
export class LoanService {
  constructor(
    private loanRepository: LoanRepository,
    private privateUserRepository: PrivateUserRepository,
    private accountService: AccountService,
  ) {}

  async create(dto: CreateLoanDto, remoteUser: User): Promise<Loan> {
    let privateUser = await this.privateUserRepository.findById(remoteUser.id);

    if (!privateUser) {
      const privateUserEntity = new PrivateUser();
      privateUser.id = remoteUser.id;
      privateUser.email = remoteUser.email;

      privateUser = await this.privateUserRepository.create(privateUserEntity);
    }

    const entity = new Loan();

    entity.user_id = privateUser.id;
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
