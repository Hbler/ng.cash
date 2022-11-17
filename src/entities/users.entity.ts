import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Account } from "./accounts.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 128 })
  username: string;

  @Column({ length: 128 })
  @Exclude()
  password: string;

  @OneToOne(() => Account, { eager: true })
  @JoinColumn()
  account: Account;
}
