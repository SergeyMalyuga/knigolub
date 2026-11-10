import { ReviewService } from "../services/review.service";
import type { NextFunction, Request, Response } from "express";
import {
  createClubReviewSchema,
  getClubReviewQuerySchema,
  updateClubReviewSchema,
} from "../schemas/review.schema";
import type { AuthRequest } from "../types/auth-request.type";
import { ValidationError } from "../errors/validation.error";

export class ReviewController {
  private reviewService = new ReviewService();

  /**
   * Получает отзывы о клубе с пагинацией.
   *
   * Маршрут: GET /club-reviews
   *
   * @param req - Express Request.
   * @param req.query.take - (string, опционально) Количество отзывов (по умолчанию 8).
   * @param req.query.page - (string, опционально) Страница с отзывами (по умолчанию 1).
   * @param res - Express response объект.
   * @param next - Express next функция для передачи ошибок.
   * @returns JSON c последними отзывами о клубе с пагинацией.
   */
  public async getClubReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = getClubReviewQuerySchema.safeParse(req.query);

      if (!parsed.success) {
        throw new ValidationError("Неверные параметры пагинации");
      }

      const { page, take } = parsed.data;
      const skip = (page - 1) * take;

      const reviews = await this.reviewService.getClubReviews({ take, skip });
      return res.status(200).json(reviews);
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * Получает отзыв пользователя о клубе.
   *
   * Маршрут: GET /club-reviews/user
   * Требует аутентификации (userId из JWT).
   *
   * @param req - Express request объект.
   * @param res - Express response объект.
   * @param next - Express next функция для передачи ошибок.
   * @returns JSON с отзывом пользователя о клубе или null.
   */
  public async getUserClubReview(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const userId = req.user.id;

    try {
      const clubReview = await this.reviewService.getUserClubReview(userId);
      return res.status(200).json(clubReview);
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * Создаёт новый отзыв о клубе. Требует аутентификации (JWT).
   *
   * Маршрут: POST /club-reviews
   *
   * @param req - Express request объект.
   * @param res - Express response объект.
   * @param next - Express next функция для передачи ошибок.
   * @returns JSON с отзывом о клубе с данными автора.
   */
  public async createClubReview(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const userId = req.user.id;

    try {
      const parsed = createClubReviewSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new ValidationError("Неверные параметры создания отзыва");
      }

      const { rating, text } = parsed.data;
      const clubReview = await this.reviewService.createClubReview({
        rating,
        text,
        userId,
      });
      return res.status(201).json(clubReview);
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * Обновляет отзыв пользователя о клубе.
   *
   * Маршрут: PATCH /club-reviews/:id
   *
   * @param req - Express request объект.
   * @param res - Express response объект.
   * @param next - Express next функция для передачи ошибок.
   * @returns JSON с обновлённым отзывом пользователя о клубе.
   */
  public async updateClubReview(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const userId = req.user.id;
    const reviewId = req.params.id as string;

    try {
      const parsed = updateClubReviewSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new ValidationError("Неверные параметры обновления отзыва");
      }

      const { rating, text } = parsed.data;

      const clubReview = await this.reviewService.updateUserReviewClub({
        reviewId,
        userId,
        rating,
        text,
      });
      return res.status(200).json(clubReview);
    } catch (error: any) {
      next(error);
    }
  }
}
