import {prisma} from "../../lib/prisma";
import {mapPrismaBookToBook} from "../mappers/book.mapper";


export class BookService {

    /**
     * Получает список книг с пагинацией и информацией об избранном.
     *
     * @param skip - Количество записей для пропуска (для пагинации).
     * @param limit - Максимальное количество записей для возврата.
     * @param userId - ID пользователя для проверки избранного (опционально).
     * @returns Объект с массивом книг и общим количеством записей.
     * @returns.books - Массив книг с флагом isFavorite.
     * @returns.totalCount - Общее количество книг в базе данных.
     */
    public async getBooks(skip: number, limit: number, userId: string | undefined) {
        const [prismaBooks, totalCount] = await Promise.all([
            prisma.book.findMany({
                skip: skip,
                take: limit,
                orderBy: {createdAt: "desc"},
                include: {
                    favorites: userId
                        ? {
                            where: {userId},
                        }
                        : false,
                },
            }),
            prisma.book.count(),
        ]);

        const books = prismaBooks.map((book) => ({
            ...mapPrismaBookToBook(book),
            isFavorite: userId ? book.favorites.length > 0 : false,
        }));

        return {books, totalCount};
    }
}