import type {Response, Request, NextFunction} from 'express';
import {FavoriteService} from "../services/favorite.service";
import type {ErrorResponse} from "@knigolub/shared";

export class FavoriteController {
    private favoriteService = new FavoriteService();

    /**
     * Переключает статус книги в избранном.
     * POST /favorites/toggle
     * Body: { bookId: string }
     */
    public async toggleFavorite(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                const error: ErrorResponse = {
                    message: 'Не авторизован'
                }
                return res.status(401).json(error);
            }

            const {bookId} = req.body;
            if (!bookId || typeof bookId !== 'string') {
                const error: ErrorResponse = {
                    message: 'Неверный bookId'
                }
                return res.status(400).json(error);
            }

            const result = await this.favoriteService.toggleFavorite(userId, bookId);

            res.status(200).json(result);
        } catch (error: any) {
            next(error);
        }
    }
}