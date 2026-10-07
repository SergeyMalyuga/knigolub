export interface CollectionCard {
    id: string;
    previewImage: string;
    title: string;
    subtitle: string;
    description: string;
    avatar: string | null;
    author: string;
    participants: number;
    books: number;
}