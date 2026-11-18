import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookRouter from "./routes/book";
import userRouter from "./routes/user";
import favoriteRouter from "./routes/favorite";
import clubReviewRouter from "./routes/club-review";
import messageRouter from "./routes/message.routes";
import {optionalAuth} from "./middleware/optional-auth.middleware";
import {errorHandler} from "./middleware/error.middleware";
import path from "node:path";
import * as http from "node:http";
import {chatGateway} from "./services/chat-gateway.service";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

chatGateway.init(server);

app.use(express.json());
app.use(cors());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../../public/uploads")),
);
app.use("/assets", express.static(path.join(__dirname, "../../public/assets")));
app.use(optionalAuth);

app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use("/favorites", favoriteRouter);
app.use("/club-reviews", clubReviewRouter);
app.use("/messages", messageRouter);

app.use(errorHandler);

server.listen(port, () => {
  console.log(`🚀 Сервер запущен на порту ${port}`);
});
