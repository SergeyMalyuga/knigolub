export interface Book {
  id: string;
  author: string;
  coverUrl?: string;
  createdAt: string;
  description: string;
  externalId?: string;
  genres: string[];
  pageCount?: number;
  publishYear?: number;
  title: string;
  updatedAt: string;
}
