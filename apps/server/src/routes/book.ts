import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { mapPrismaBookToShared } from "../mapper/book.mapper";
import type { PaginationMeta } from "@knigolub/shared/src/models/pagination-meta";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const skip = (page - 1) * limit;

    const [prismaBooks, totalCount] = await Promise.all([
      prisma.book.findMany({
        skip: skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.book.count(),
    ]);

    const books = prismaBooks.map((book) => mapPrismaBookToShared(book));
    const pagination: PaginationMeta = {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      hasNextPage: page * limit < totalCount,
      hasPrevPage: page > 1,
    };

    res.json({
      books,
      pagination,
    });
  } catch (err) {
    console.error("Ошибка при получении книг:", err);
    res.status(500).json({ error: "Не удалось получить книги" });
  }
});

export default router;
