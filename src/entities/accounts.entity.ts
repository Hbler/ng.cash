import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Transaction } from "./transactions.entity";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  balance: number;

  @OneToMany(
    (type) => Transaction,
    (transaction) => transaction.debitedAccountId
  )
  debitTransactions: Transaction[];

  @OneToMany(
    (type) => Transaction,
    (transaction) => transaction.creditedAccountId
  )
  creditTransctions: Transaction[];
}
