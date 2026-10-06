import { Book } from "./book.model";
import { PaginationMeta } from "./pagination-meta.model";

export interface BookResponse {
  books: Book[];
  pagination: PaginationMeta;
}
