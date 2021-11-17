import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./Status";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  confirmDate: Date;

  @Column({ type: "enum", enum: Status, default: Status.UNCONFIRMED })
  status: Status;

  @Column()
  userName: string;

  @Column()
  mail: string;

  @Column()
  phoneNumber: number
  
}
