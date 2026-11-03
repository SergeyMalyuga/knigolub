import { prisma } from "../../lib/prisma";
import { mapPrismaToClubReview } from "../mappers/review.mapper";
import type { ClubReview } from "@knigolub/shared";
import type { GetReviewsOptions } from "../types/get-reviews-options.type";
import type { CreateClubReviewInput } from "../types/create-club-review-input.type";
import { NotFoundError } from "../errors/not-found.error";

export class ReviewService {
  /**
   * Получает список отзывов о клубе.
   *
   * @param options - Объект с параметрами пагинации.
   * @param options.take - Количество отзывов для выборки (ожидается число).
   * @param options.skip - Количество пропускаемых отзывов (ожидается число).
   * @returns Массив отзывов о клубе, готовых для отправки клиенту.
   */
  public async getClubReviews(
    options: GetReviewsOptions,
  ): Promise<ClubReview[]> {
    const prismaReviews = await prisma.clubReview.findMany({
      take: options.take,
      skip: options.skip,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        text: true,
        rating: true,
        user: {
          select: {
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    return prismaReviews.map(mapPrismaToClubReview);
  }

  /**
   * Создаёт отзыв о клубе.
   *
   * @param input - Объект с данными об отзыве.
   * @param input.userId - Id автора отзыва (из JWT).
   * @param input.rating - Оценка клуба.
   * @param input.text - Текст отзыва
   * @returns Созданный отзыв с данными автора.
   */
  public async createClubReview(input: CreateClubReviewInput): Promise<ClubReview> {
    const { userId, rating, text } = input;

    const prismaClubReview = await prisma.clubReview.create({
      data: { rating, text, userId },
      select: {
        id: true,
        text: true,
        rating: true,
        user: {
          select: {
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    return mapPrismaToClubReview(prismaClubReview);
  }
}
