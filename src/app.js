/*-----Import the dependencies-----*/
import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import config from "./config/config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import initializatePassport from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { addLogger } from "./loggers/logger.js";
import cors from "cors";
import swaggerUiExpress from "swagger-ui-express";
import { specs } from "./swagger/swagger.js";

/*-----Import the routes-----*/
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import viewsRoutes from "./routes/view.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import { messageRepository } from "./services/index.js";
import { productRepository } from "./services/index.js";
import userRoutes from "./routes/user.routes.js";

/*-----Configure the server-----*/
const PORT = config.port;
const app = express();

/*-----configure the template engine-----*/
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(addLogger);
app.use(cors({ origin: "*" }));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.url,
      dbName: config.dbName,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: process.env.ttl,
    }),
    secret: "CoderSecret",
    resave: true,
    saveUninitialized: true,
  })
);

initializatePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser("keyCookieForJWT"));

app.use("/", viewsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

const runServer = () => {
  const httpServer = app.listen(PORT, console.log(`✅Server escuchando in the port: ${PORT}`));
  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    console.log("Client connected succesly");
    socket.on("new-product", passport.authenticate("jwt", { session: false }), async (data) => {
      try {
        await productRepository.addProduct(data);
        const products = await productRepository.getProducts();
        io.emit("reload-table", products);
      } catch (e) {
        console.log(e);
      }
    });
    socket.on("delete-product", async (id, email) => {
      try {
        await productRepository.deleteProduct(id, email);
        const products = await productRepository.getProducts();
        io.emit("reload-table", products);
      } catch (e) {
        console.log(e);
      }
    });
    socket.on("message", async (data) => {
      await messageRepository.saveMessage(data);
      //Envia el back
      const messages = await messageRepository.getMessages();
      io.emit("messages", messages);
    });
    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
};

runServer();
