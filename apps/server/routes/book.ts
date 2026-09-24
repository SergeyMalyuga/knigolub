import { Router } from "express";
import { prisma } from "../lib/prisma";
import { mapPrismaBookToShared } from "../mapper/book.mapper";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const prismaBooks = await prisma.book.findMany();
    const books = prismaBooks.map((book) => mapPrismaBookToShared(book));
    res.json(books);
  } catch (err) {
    console.error("Ошибка при получении книг:", err);
    res.status(500).json({ error: "Не удалось получить книги" });
  }
});

export default router;
