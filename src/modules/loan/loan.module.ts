import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanRepository } from './loan.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { LoanController } from './loan.controller';
import { PrivateUserModule } from '../private-user/private-user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Loan]), PrivateUserModule],
  controllers: [LoanController],
  providers: [LoanService, LoanRepository],
})
export class LoanModule {}
