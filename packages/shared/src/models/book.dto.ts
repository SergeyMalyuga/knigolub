export interface BookDto {
  id: string;
  googleId: string;
  title: string;
  authors: string[];
  description: string | null;
  thumbnail: string | null;
  isbn10: string | null;
  isbn13: string | null;
  publisher: string | null;
  publishedAt: string | null;
  pageCount: number | null;
  language: string | null;
  categories: string[];
  createdAt: string;
  updatedAt: string;
}
