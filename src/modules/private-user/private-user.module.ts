import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateUser } from './entities/private-user.entity';
import { PrivateUserMicroserviceController } from './private-user.microservice.controller';
import { PrivateUserRepository } from './private-user.repository';
import { PrivateUserService } from './private-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateUser])],
  controllers: [PrivateUserMicroserviceController],
  providers: [PrivateUserService, PrivateUserRepository],
  exports: [PrivateUserService, PrivateUserRepository],
})
export class PrivateUserModule {}
