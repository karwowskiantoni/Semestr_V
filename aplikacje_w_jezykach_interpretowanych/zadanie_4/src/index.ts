import express, { json, NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { createConnection, Entity } from "typeorm";
import { Category } from "./entity/Category";
import { Product } from "./entity/Product";
import { Status } from "./entity/Status";

createConnection()
  .then(async (connection) => {
    const app = express();

    app.use(json());

    app.post(
      "/products",
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const product = new Product(
          req.body.name,
          req.body.description,
          req.body.price,
          req.body.weight,
          req.body.category
        );
        console.log("Inserting a new user into the database...");
        await connection.manager.save(product);
        console.log("Saved a new user with id: " + product.id);

        res.status(200).json({ productId: product.id });

        next();
      }
    );

    app.get(
      "/products",
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        console.log("Loading products from the database...");
        const products = await connection.manager.find(Product);
        console.log("Loaded users: ", products);

        res.json(products);

        next();
      }
    );

    app.get(
      "/products/:prodId",
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        console.log("Loading product from the database...");
        const wantedId: number = parseInt(req.params.prodId);
        const product = await connection.manager.findOne(Product, {
          id: wantedId,
        });
        console.log("Product with id ", wantedId , product);

        res.json(product);

        next();
      }
    );

    app.get(
      "/categories",
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const categories = Object.values(Category);
        console.log("Available categories: ", categories);

        res.json(categories);

        next();
      }
    );

    app.get(
      "/statuses",
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const statuses = Object.values(Status);
        console.log("Available statuses: ", statuses);

        res.json(statuses);

        next();
      }
    );

    app.listen(3000, () => {
      console.log("API is running on http://localhost:3000");
    });
  })
  .catch((error) => console.log(error));
