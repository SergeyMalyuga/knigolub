import axios from "axios";
import type {GoogleBooksResponse} from "../models/google-books-response";

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

export class GoogleBooksService {

    async searchBooks(query: string, maxResults: number = 20) {
        try {
            const response = await axios.get<GoogleBooksResponse>(GOOGLE_BOOKS_API_URL, {
                params: {
                    q: query,
                    langRestrict: 'ru',
                    maxResults,
                    printType: 'books',
                    key: process.env.GOOGLE_BOOKS_API_KEY || undefined
                },
            });

            return response.data.items || [];
        } catch (error) {
            console.error('Ошибка при поиске книг:', error);
            throw new Error('Не удалось получить данные из Google Books API');
        }
    }

    async searchBooksByGenre(genre: string, maxResults: number = 20) {
        try {
            // Формируем запрос с оператором subject:
            const query = `subject:${genre}`;

            const response = await axios.get<GoogleBooksResponse>(GOOGLE_BOOKS_API_URL, {
                params: {
                    q: query,
                    langRestrict: 'ru',
                    maxResults,
                    printType: 'books',
                },
            });

            return response.data.items || [];
        } catch (error) {
            console.error(`Ошибка при поиске книг в жанре "${genre}":`, error);
            throw new Error('Не удалось получить данные из Google Books API');
        }
    }
}

export const googleBooksService = new GoogleBooksService();