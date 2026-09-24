import type { GoogleBookItem } from "models/google-book-item";

export interface GoogleBooksResponse {
  items?: GoogleBookItem[];
  totalItems: number;
}
