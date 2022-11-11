import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrivateUserDto } from './dto/create-private-user.dto';
import { UpdatePrivateUserDto } from './dto/update-private-user.dto';
import { PrivateUser } from './entities/private-user.entity';
import { PrivateUserRepository } from './private-user.repository';

@Injectable()
export class PrivateUserService {
  constructor(private privateUserRepository: PrivateUserRepository) {}

  async create(dto: CreatePrivateUserDto): Promise<PrivateUser> {
    const entity = new PrivateUser();

    entity.id = dto.id;
    entity.email = dto.email;

    return this.privateUserRepository.create(entity);
  }

  async update(id: number, dto: UpdatePrivateUserDto): Promise<PrivateUser> {
    const entity = await this.privateUserRepository.findById(id);

    if (!entity) throw new NotFoundException(`User with id: ${id} not found`);

    return this.privateUserRepository.update(entity, dto);
  }

  async delete(id: number): Promise<PrivateUser> {
    const entity = await this.privateUserRepository.findById(id);

    if (!entity) throw new NotFoundException(`User with id: ${id} not found`);

    const result = await this.privateUserRepository.delete(entity);

    return result;
  }
}
