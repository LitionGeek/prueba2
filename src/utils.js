import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
import { faker } from "@faker-js/faker";

export const generateToken = (user) =>
  jwt.sign({ user }, process.env.PRIVATE_KEY, {
    expiresIn: "24h",
  });

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const generateProducts = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    departament: faker.commerce.department(),
    stock: faker.datatype.number(),
    id: faker.database.mongodbObjectId(),
    image: faker.image.imageUrl(),
  };
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;
