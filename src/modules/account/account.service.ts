import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { EmitLoanApprovedDto } from './dto/emit-loan-approved.dto';

@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNT_APPLICATION') private client: ClientProxy,
    configService: ConfigService,
  ) {
    if (!configService.get('microservice.account.host'))
      throw new Error('Missing env var ACCOUNT_SERVICE_HOST');
    if (!configService.get('microservice.account.port'))
      throw new Error('Missing env var ACCOUNT_SERVICE_PORT');
  }

  emitLoanApproved(dto: EmitLoanApprovedDto) {
    this.client.emit('loan-approved', dto);
  }
}
