import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EmitLoanApprovedDto } from './dto/emit-loan-approved.dto';

@Injectable()
export class AccountService {
  constructor(@Inject('ACCOUNT_APPLICATION') private client: ClientProxy) {}

  emitLoanApproved(dto: EmitLoanApprovedDto) {
    this.client.emit('loan-approved', dto);
  }
}
