import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./accounts.entity";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => Account, (account) => account.debitTransactions)
  debitedAccountId: Account;

  @ManyToOne((type) => Account, (account) => account.creditTransctions)
  creditedAccountId: Account;
}
