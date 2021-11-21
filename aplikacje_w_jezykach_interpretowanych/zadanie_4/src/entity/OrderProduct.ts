import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export class OrderProduct {
  constructor(orderId: number, productId: number, quantity: number) {
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
  }

  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  productId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderConnection, {
    primary: true,
  })
  @JoinColumn({ name: "productId" })
  product: Promise<Product>;

  @ManyToOne(() => Order, (order) => order.productConnection, {
    primary: true,
  })
  @JoinColumn({ name: "orderId" })
  order: Promise<Order>;
}
