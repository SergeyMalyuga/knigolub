export interface GoogleBookVolumeInfo {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
        thumbnail?: string;
        smallThumbnail?: string;
    };
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    language?: string;
    categories?: string[];
    industryIdentifiers?: Array<{
        type: string;
        identifier: string;
    }>;
}