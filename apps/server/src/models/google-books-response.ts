import type {GoogleBookItem} from "./google-book-item";


export interface GoogleBooksResponse {
  items?: GoogleBookItem[];
  totalItems: number;
}
