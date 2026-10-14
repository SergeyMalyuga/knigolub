import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookRouter from "./routes/book";
import userRouter from "./routes/user";
import { authMiddleware } from "./middleware/auth.middleware";
import {errorHandler} from "./middleware/error.middleware";
import path from "node:path";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
app.use(authMiddleware);

app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Сервер запущен на порту ${port}`);
});
