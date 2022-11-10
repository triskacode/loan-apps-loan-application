import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { LoanRepository } from './loan.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan])],
  controllers: [LoanController],
  providers: [LoanService, LoanRepository],
})
export class LoanModule {}
