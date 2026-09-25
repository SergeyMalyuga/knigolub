import type { Book as PrismaBook } from "../../generated/prisma/client";
import type { Book } from "@knigolub/shared/src/models/book";
import { jsonToStringArray } from "../utils/json";

export function mapPrismaBookToShared(book: PrismaBook): Book {
  return {
    id: book.id,
    googleId: book.googleId,
    title: book.title,
    authors: jsonToStringArray(book.authors),
    description: book.description,
    thumbnail: book.thumbnail,
    pageCount: book.pageCount,
  };
}
