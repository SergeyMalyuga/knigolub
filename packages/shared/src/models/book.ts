export interface Book {
  id: string;
  googleId: string | null;
  title: string;
  authors: string[];
  description: string | null;
  thumbnail: string | null;
  pageCount: number | null;
  categories: string[];
}
