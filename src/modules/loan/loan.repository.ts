import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';

@Injectable()
export class LoanRepository {
  constructor(@InjectRepository(Loan) private repository: Repository<Loan>) {}

  async create(entity: Loan): Promise<Loan> {
    const newEntity = await this.repository.save(entity);

    return newEntity;
  }

  async update(entity: Loan, updateSet: Partial<Loan>): Promise<Loan> {
    entity.state = updateSet.state ?? entity.state;

    const newEntity = await this.repository.save(entity);

    return newEntity;
  }

  async delete(entity: Loan): Promise<Loan> {
    await this.repository.delete(entity.id);

    return entity;
  }

  async findAll(
    query?: Partial<Pick<Loan, 'state' | 'user_id'>>,
  ): Promise<Loan[]> {
    return this.repository
      .createQueryBuilder('loan')
      .where({
        ...(query?.user_id !== undefined ? { user_id: query.user_id } : {}),
        ...(query?.state !== undefined ? { state: query.state } : {}),
      })
      .leftJoinAndSelect('loan.user', 'user')
      .getMany();
  }

  async findById(id: Loan['id']): Promise<Loan> {
    return this.repository.createQueryBuilder('loan').where({ id }).getOne();
  }
}
