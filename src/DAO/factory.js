import config from "../config/config.js";
import mongoose from "mongoose";
import CustomError from "../errors/CustomError.js";

export let User;
export let Product;
export let Category;
export let Message;
export let Cart;
export let Session;
export let Ticket;

switch (config.persistence) {
  case "MONGO":
    mongoose
      .connect(config.url, {
        dbName: config.dbName,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Database Connected Successfully"))
      .catch((err) => CustomError.createError(err));
    const { default: UserMongo } = await import("./mongo/user.mongo.js");
    const { default: ProductMongo } = await import("./mongo/products.mongo.js");
    const { default: CategoryMongo } = await import(
      "./mongo/category.mongo.js"
    );
    const { default: MessageMongo } = await import("./mongo/messages.mongo.js");
    const { default: CartMongo } = await import("./mongo/carts.mongo.js");
    const { default: SessionMongo } = await import("./mongo/user.mongo.js");
    const { default: TicketMongo } = await import("./mongo/ticket.mongo.js");
    Product = ProductMongo;
    Category = CategoryMongo;
    Message = MessageMongo;
    Cart = CartMongo;
    User = UserMongo;
    Session = SessionMongo;
    Ticket = TicketMongo;
  default:
    break;
}
