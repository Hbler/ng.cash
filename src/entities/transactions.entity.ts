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

  @ManyToOne((type) => Account, (account) => account.debitTransactions, {
    eager: true,
  })
  debitedAccount: Account;

  @ManyToOne((type) => Account, (account) => account.creditTransctions, {
    eager: true,
  })
  creditedAccount: Account;
}
