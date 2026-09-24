export interface Book {
    id: string;
    googleId: string | null;
    title: string;
    authors: string[] | null;
    description: string | null;
    thumbnail: string | null;
    pageCount: number | null;
}