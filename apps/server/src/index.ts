import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookRouter from "./routes/book";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/books", bookRouter);

app.listen(port, () => {
  console.log(`🚀 Сервер запущен на порту ${port}`);
});
