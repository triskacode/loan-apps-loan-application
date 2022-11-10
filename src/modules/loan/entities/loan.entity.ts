import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoanState } from '../loan.types';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  user_id!: number;

  @Column()
  amount!: number;

  @Column({ enum: LoanState, default: LoanState.PENDING })
  state: LoanState;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
