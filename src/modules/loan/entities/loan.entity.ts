import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoanState } from '../loan.types';
import { PrivateUser } from '../../private-user/entities/private-user.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount!: number;

  @Column({ enum: LoanState, default: LoanState.PENDING })
  state: LoanState;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => PrivateUser, (entity: PrivateUser) => entity.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: PrivateUser;

  @Column({ name: 'user_id' })
  @Index()
  user_id: PrivateUser['id'];
}
