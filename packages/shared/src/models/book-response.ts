import {Book} from "./book";
import {PaginationMeta} from "./pagination-meta";

export interface BookResponse {
    books: Book[];
    pagination: PaginationMeta;
}