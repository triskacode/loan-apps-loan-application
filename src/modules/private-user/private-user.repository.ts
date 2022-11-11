import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrivateUser } from './entities/private-user.entity';

@Injectable()
export class PrivateUserRepository {
  constructor(
    @InjectRepository(PrivateUser) private repository: Repository<PrivateUser>,
  ) {}

  async create(entity: PrivateUser): Promise<PrivateUser> {
    const newEntity = await this.repository.save(entity);

    return newEntity;
  }

  async update(
    entity: PrivateUser,
    updateSet: Partial<PrivateUser>,
  ): Promise<PrivateUser> {
    entity.email = updateSet.email ?? entity.email;

    const newEntity = await this.repository.save(entity);

    return newEntity;
  }

  async delete(entity: PrivateUser): Promise<PrivateUser> {
    await this.repository.delete(entity.id);

    return entity;
  }

  async findById(id: PrivateUser['id']): Promise<PrivateUser> {
    return this.repository.createQueryBuilder('user').where({ id }).getOne();
  }
}
