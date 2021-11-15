import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  constructor(name, description, price, weight) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.weight = weight;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  weight: number;
}
