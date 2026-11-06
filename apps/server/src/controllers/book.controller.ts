import type {Request, Response} from "express";
import type {PaginationMeta} from "@knigolub/shared";
import {BookService} from "../services/book.service";

export class BookController {
    private bookService = new BookService();

    /**
     * Обрабатывает GET-запрос для получения списка книг с пагинацией.
     *
     * Извлекает параметры пагинации из query-строки, вызывает сервис для получения данных
     * и возвращает JSON-ответ с книгами и метаданными пагинации.
     *
     * @param req - Express Request объект.
     * @param req.query.page - Номер страницы (по умолчанию: 1).
     * @param req.query.limit - Количество книг на странице (по умолчанию: 8).
     * @param res - Express Response объект.
     * @param next - Express NextFunction для передачи ошибок.
     *
     * @returns JSON-ответ с массивом книг и объектом пагинации.
     * @returns.books - Массив книг текущей страницы.
     * @returns.pagination - Метаданные пагинации (currentPage, totalPages, totalCount и т.д.).
     *
     * @throws 500 - При ошибке получения данных из базы данных.
     */
    public async getBooks(req: Request, res: Response) {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 8;
        const userId = req.user?.id;
        const skip = (page - 1) * limit;
        try {


            const {books, totalCount} = await this.bookService.getBooks(skip, limit, userId);

            const shown = Math.min(page * limit, totalCount);

            const pagination: PaginationMeta = {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalCount,
                hasNextPage: page * limit < totalCount,
                hasPrevPage: page > 1,
                shown,
            };

            res.json({
                books,
                pagination,
            });
        } catch (err) {
            console.error("Ошибка при получении книг:", err);
            res.status(500).json({error: "Не удалось получить книги"});
        }
    }
}