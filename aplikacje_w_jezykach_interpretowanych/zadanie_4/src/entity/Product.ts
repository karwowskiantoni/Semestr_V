import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
  constructor(
    name: string,
    description: string,
    price: number,
    weight: number,
    category?: any
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.weight = weight;
    this.category = Object.values(Product).includes(category)
      ? category
      : Category.UNKNOWN;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "double precision" })
  price: number;

  @Column({ type: "double precision" })
  weight: number;

  @Column({ type: "enum", enum: Category, default: Category.UNKNOWN })
  category: Category;
}
