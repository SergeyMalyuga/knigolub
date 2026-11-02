import {jsonToStringArray} from "../utils/json";
import type {Book} from "@knigolub/shared/src/models/book.model";
import type {BookForMapping} from "../models/book-for-mapping.model";

export function mapPrismaBookToBook(book: BookForMapping): Book {
  return {
    id: book.id,
    googleId: book.googleId,
    title: book.title,
    authors: jsonToStringArray(book.authors),
    description: book.description,
    thumbnail: book.thumbnail,
    pageCount: book.pageCount,
    categories: jsonToStringArray(book.categories),
    isFavorite: false,
  };
}
