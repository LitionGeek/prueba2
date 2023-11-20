import {
  User,
  Product,
  Category,
  Message,
  Cart,
  Ticket,
} from "../DAO/factory.js";

import ProductRepository from "./products.repository.js";
import CategoryRepository from "./category.repository.js";
import MessageRepository from "./messages.repository.js";
import CartRepository from "./carts.repository.js";
import UserRepository from "./user.repository.js";
import SessionRepository from "./session.repository.js";
import TicketRepository from "./ticket.repository.js";

export const productRepository = new ProductRepository(
  new Product(),
  new User()
);
export const categoryRepository = new CategoryRepository(new Category());
export const messageRepository = new MessageRepository(new Message());
export const cartRepository = new CartRepository(
  new Cart(),
  new User(),
  new Product(),
  new Ticket()
);
export const userRepository = new UserRepository(new User(), new Cart());
export const sessionRepository = new SessionRepository(new User());
export const ticketRepository = new TicketRepository(new Ticket());
