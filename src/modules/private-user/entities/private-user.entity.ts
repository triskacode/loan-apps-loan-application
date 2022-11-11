import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Loan } from '../../loan/entities/loan.entity';

@Entity()
export class PrivateUser {
  @PrimaryColumn()
  id!: number;

  @Column({ unique: true })
  @Index()
  email!: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Loan, (loan) => loan.user, { cascade: true })
  loans: Loan[];
}
