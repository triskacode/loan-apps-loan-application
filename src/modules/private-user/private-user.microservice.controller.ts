import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { HandleUserActivatedDto } from './dto/handle-user-activated.dto';
import { HandleUserDeletedDto } from './dto/handle-user-deleted.dto';
import { HandleUserUpdatedDto } from './dto/handle-user-updated.dto';
import { PrivateUserService } from './private-user.service';

@Controller('private-user.microservice')
export class PrivateUserMicroserviceController {
  constructor(private privateUserService: PrivateUserService) {}

  @EventPattern('user-activated')
  handleUserActivated(dto: HandleUserActivatedDto) {
    console.log('user-activated');
    this.privateUserService.create(dto).then(console.log);
  }

  @EventPattern('user-updated')
  handleUserUpdated(dto: HandleUserUpdatedDto) {
    console.log('user-updated');
    this.privateUserService.update(dto.id, dto).then(console.log);
  }

  @EventPattern('user-deleted')
  handleUserDeleted(dto: HandleUserDeletedDto) {
    console.log('user-deleted');
    this.privateUserService.delete(dto.id).then(console.log);
  }
}
