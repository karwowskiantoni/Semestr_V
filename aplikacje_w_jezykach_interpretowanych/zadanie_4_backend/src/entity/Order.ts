import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderProduct } from "./OrderProduct";
import { Status } from "./Status";

@Entity()
export class Order {
  constructor(
    status: Status,
    userName: string,
    mail: string,
    phoneNumber: string,
    confirmDate?: Date
  ) {
    this.confirmDate = confirmDate ? confirmDate : null;
    this.status = status;
    this.userName = userName;
    this.mail = mail;
    this.phoneNumber = phoneNumber;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  confirmDate?: Date;

  @Column({ type: "enum", enum: Status, default: Status.UNCONFIRMED })
  status: Status;

  @Column()
  userName: string;

  @Column()
  mail: string;

  @Column()
  phoneNumber: string;

  products: OrderProduct[];

  @OneToMany(() => OrderProduct, (po) => po.product)
  productConnection: Promise<OrderProduct[]>;
}
