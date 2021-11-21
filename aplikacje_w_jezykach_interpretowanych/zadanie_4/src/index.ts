import express, { json, NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { createConnection, Entity } from "typeorm";
import { Category } from "./entity/Category";
import { Order } from "./entity/Order";
import { OrderProduct } from "./entity/OrderProduct";
import { Product } from "./entity/Product";
import { Status } from "./entity/Status";

createConnection()
  .then(async (connection) => {
    const app = express();

    app.use(json());

    //PRODUCTS
    app.post(
      "/products",
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          if (
            req.body.price <= 0 ||
            req.body.weight <= 0 ||
            req.body.description === "" ||
            req.body.name === ""
          ) {
            res
              .status(400)
              .json(
                "Error occured. Possible reasons: 1.Empty name or description. 2.Price and weight are sub or equal zero"
              );
            next();
          } else {
            const product = new Product(
              req.body.name,
              req.body.description,
              req.body.price,
              req.body.weight,
              req.body.category
            );
            console.log("Inserting a new product into the database...");
            await connection.manager.save(product);
            console.log("Saved a new product with id: " + product.id);

            res.status(200).json(product);
            next();
          }
        } catch (e) {
          res.status(400).json(e);
          next();
        }
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
        if (products) {
          res.json(products);
          next();
        } else {
          res.status(404).json("No products in database");
          next();
        }
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
        console.log("Product with id ", wantedId, product);
        if (product) {
          res.json(product);
          next();
        } else {
          res.status(404).json("No product with given id");
          next();
        }
      }
    );

    app.put(
      "/products/:prodId",
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const wantedId: number = parseInt(req.params.prodId);
        const product = await connection.manager.findOne(Product, {
          id: wantedId,
        });
        if (product) {
          req.body.name && req.body.name !== ""
            ? (product.name = req.body.name)
            : undefined;
          req.body.description && req.body.description !== ""
            ? (product.description = req.body.description)
            : undefined;
          req.body.price && req.body.price >= 0
            ? (product.price = req.body.price)
            : undefined;
          req.body.weight && req.body.weight >= 0
            ? (product.weight = req.body.weight)
            : undefined;
          if (req.body.category) {
            product.category = Object.values(Category).includes(
              req.body.category
            )
              ? req.body.category
              : Category.UNKNOWN;
          }
          await connection.manager.save(product);

          res.json(product);
          next();
        } else {
          res.status(404).json("No product with given id");
          next();
        }
      }
    );

// CATEGORIES

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

    // STATUSES

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

// ORDERS

    app.post(
      "/orders",
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const order = new Order(
          req.body.status,
          req.body.userName,
          req.body.mail,
          req.body.phone,
          req.body.confirmDate
        );
        console.log("Inserting a new order into the database...");
        await connection.manager.save(order);
        console.log("Saved a new order with id: " + order.id);

        const orderedProducts = new Array<OrderProduct>();
        for (let i = 0; i < req.body.products.length; i++) {
          orderedProducts[i] = new OrderProduct(
            order.id,
            req.body.products[i].productId,
            req.body.products[i].quantity
          );
        }
        console.log(orderedProducts);
        for (let i = 0; i < orderedProducts.length; i++) {
          await connection.manager.save(orderedProducts[i]);
        }

        res.json(orderedProducts);
        next();
      }
    );

    app.get(
      "/orders",
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const orders = await connection.manager.find(Order);

        for (let i = 0; i < orders.length; i++) {
          const products = await connection.manager.find(OrderProduct, {
            where: { orderId: orders[i].id },
          });
          products.forEach((product) => delete product.orderId);
          orders[i].products = products;
        }

        res.json(orders);

        next();
      }
    );

    app.put(
      "/orders/:ordId",
      async (req: Request, res: Response, next: NextFunction) => {
        const wantedId: number = parseInt(req.params.ordId);
        const order = await connection.manager.findOne(Order, {
          id: wantedId,
        });
        console.log("before update", order);

        if (req.body.status) {
          if (Object.values(Status).includes(req.body.status)) {
            await connection.manager.save(order);
            console.log("after update", order);
            res.json(order);
            next();
          } else {
            res.status(400).json("No such status");
            next();
          }
        } else {
          res.status(400).json("Empty status");
          next();
        }
      }
    );

    app.get(
      "/orders/:status",
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const orders = await connection.manager.find(Order, {
          where: { status: req.params.status },
        });
        for (let i = 0; i < orders.length; i++) {
          const products = await connection.manager.find(OrderProduct, {
            where: { orderId: orders[i].id },
          });
          products.forEach((product) => delete product.orderId);
          orders[i].products = products;
        }
        res.json(orders);
        next();
      }
    );

    app.listen(3000, () => {
      console.log("API is running on http://localhost:3000");
    });
  })
  .catch((error) => console.log(error));
