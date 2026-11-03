import {ReviewService} from "../services/review.service";
import type {NextFunction, Request, Response} from "express";
import {createClubReviewSchema, getClubReviewQuerySchema} from "../schemas/review.schema";
import type {ErrorResponse} from "@knigolub/shared";
import {NotFoundError} from "../errors/not-found.error";

export class ReviewController {
    private reviewService = new ReviewService();

    /**
     * GET /club-reviews
     *
     * Получает отзывы о клубе с пагинацией.
     *
     * @param req - Express Request.
     * @param req.query.take - (string, опционально) Количество отзывов (по умолчанию 8).
     * @param req.query.page - (string, опционально) Смещение (по умолчанию 1).
     * @returns Возвращает последние отзывы о клубе с пагинацией.
     */
    public async getClubReviews(req: Request, res: Response, next: NextFunction) {
        const parsed = getClubReviewQuerySchema.safeParse(req.query);

        if (!parsed.success) {
            const error: ErrorResponse = {message: 'Неверные параметры пагинации'}
            return res.status(400).json(error);
        }

        const {page, take} = parsed.data;
        const skip = (page - 1) * take;

        try {
            const reviews = await this.reviewService.getClubReviews({take, skip});
            return res.status(200).json(reviews);
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * POST /club-reviews
     *
     * Создаёт новый отзыв о клубе. Требует аутентификации (JWT).
     *
     * @body rating - Оценка клуба
     * @body text - Текст отзыва
     * @returns Возвращает отзыв о клубе с данными автора
     */
    public async createClubReview(req: Request, res: Response, next: NextFunction) {
        const userId = req.user?.id;

        if (!userId) {
            const errorResponse: ErrorResponse = {message: 'Требуется аутентификация', status: 401};
            return res.status(401).json(errorResponse);
        }

        const parsed = createClubReviewSchema.safeParse(req.body);

        if (!parsed.success) {
            const error: ErrorResponse = {message: 'Неверные параметры создания отзыва'}
            return res.status(400).json(error);
        }

        try {
            const {rating, text} = parsed.data;
            const clubReview = await this.reviewService.createClubReview({rating, text, userId});
            return res.status(201).json(clubReview);

        } catch (error: any) {
            next(error);
        }
    }
}