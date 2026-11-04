import { ReviewService } from "../services/review.service";
import type { NextFunction, Request, Response } from "express";
import {
  createClubReviewSchema,
  getClubReviewQuerySchema,
} from "../schemas/review.schema";
import type { ErrorResponse } from "@knigolub/shared";

export class ReviewController {
  private reviewService = new ReviewService();

  /**
   * Получает отзывы о клубе с пагинацией.
   *
   * Маршрут: GET /club-reviews
   *
   * @param req - Express Request.
   * @param req.query.take - (string, опционально) Количество отзывов (по умолчанию 8).
   * @param req.query.page - (string, опционально) Смещение (по умолчанию 1).
   * @returns JSON c последними отзывами о клубе с пагинацией.
   */
  public async getClubReviews(req: Request, res: Response, next: NextFunction) {
    const parsed = getClubReviewQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      const error: ErrorResponse = { message: "Неверные параметры пагинации" };
      return res.status(400).json(error);
    }

    const { page, take } = parsed.data;
    const skip = (page - 1) * take;

    try {
      const reviews = await this.reviewService.getClubReviews({ take, skip });
      return res.status(200).json(reviews);
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * Получает отзыв пользователя о проекте.
   *
   * Маршрут: GET /club-reviews/user
   * Требует аутентификации (userId из JWT).
   *
   * @param req - Express request объект.
   * @param res - Express response объект.
   * @param next - Express next функция для передачи ошибок.
   * @returns JSON с отзывом пользователя или null.
   */
  public async getUserClubReview(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      const error: ErrorResponse = { message: "Требуется аутентификация" };
      return res.status(401).json(error);
    }

    try {
      const clubReview = await this.reviewService.getUserClubReview(userId);
      return res.json(clubReview);
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
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      const errorResponse: ErrorResponse = {
        message: "Требуется аутентификация",
        status: 401,
      };
      return res.status(401).json(errorResponse);
    }

    const parsed = createClubReviewSchema.safeParse(req.body);

    if (!parsed.success) {
      const error: ErrorResponse = {
        message: "Неверные параметры создания отзыва",
      };
      return res.status(400).json(error);
    }

    try {
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
}
