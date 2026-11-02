import {ReviewService} from "../services/review.service";
import type {Request, Response, NextFunction} from "express";
import {getReviewQuerySchema} from "../schemas/review.schema";
import type {ErrorResponse} from "@knigolub/shared";

export class ReviewController {
    private reviewService = new ReviewService();

    /**
     * GET /api/club-reviews.
     *
     * @param req - Express Request.
     * @param req.query.take - (string, опционально) Количество отзывов (по умолчанию 8).
     * @param req.query.page - (string, опционально) Смещение (по умолчанию 1).
     * @returns Возвращает последние отзывы о клубе с пагинацией.
     */
    public async getClubReviews(req: Request, res: Response, next: NextFunction) {
        const parsed = getReviewQuerySchema.safeParse(req.query);

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
}