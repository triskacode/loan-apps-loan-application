import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { HandleUserActivatedDto } from './dto/handle-user-activated.dto';
import { HandleUserDeletedDto } from './dto/handle-user-deleted.dto';
import { HandleUserUpdatedDto } from './dto/handle-user-updated.dto';
import { PrivateUserService } from './private-user.service';

@Controller('private-user.microservice')
export class PrivateUserMicroserviceController {
  constructor(private privateUserService: PrivateUserService) {}

  @EventPattern('user-activated')
  async handleUserActivated(dto: HandleUserActivatedDto) {
    try {
      Logger.debug(
        'handle user-activated',
        'PrivateUserMicroserviceController',
      );
      await this.privateUserService.create(dto).then(console.log);
    } catch (err) {
      Logger.error(err.message, 'PrivateUserMicroserviceController');
    }
  }

  @EventPattern('user-updated')
  async handleUserUpdated(dto: HandleUserUpdatedDto) {
    try {
      Logger.debug('handle user-updated', 'PrivateUserMicroserviceController');
      await this.privateUserService.update(dto.id, dto).then(console.log);
    } catch (err) {
      Logger.error(err.message, 'PrivateUserMicroserviceController');
    }
  }

  @EventPattern('user-deleted')
  async handleUserDeleted(dto: HandleUserDeletedDto) {
    try {
      Logger.debug('handle user-deleted', 'PrivateUserMicroserviceController');
      await this.privateUserService.delete(dto.id).then(console.log);
    } catch (err) {
      Logger.error(err.message, 'PrivateUserMicroserviceController');
    }
  }
}
