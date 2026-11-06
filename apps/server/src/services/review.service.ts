import {prisma} from "../../lib/prisma";
import {mapPrismaToClubReview} from "../mappers/review.mapper";
import type {ClubReview} from "@knigolub/shared";
import type {GetReviewsOptions} from "../types/get-reviews-options.type";
import type {CreateClubReviewInput} from "../types/create-club-review-input.type";
import {NotFoundError} from "../errors/not-found.error";
import type {UpdateClubReview} from "../types/update-club-review.type";
import {ForbiddenError} from "../errors/forbiddent.error";

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
            orderBy: {createdAt: "desc"},
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
     * Получает отзыв пользователя о проекте.
     *
     * @param userId - ID пользователя (из JWT).
     * @returns Отзыв пользователя о проекте или null, если отзыва нет.
     */
    public async getUserClubReview(userId: string): Promise<ClubReview | null> {
        const prismaReview = await prisma.clubReview.findFirst({
            where: {userId},
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

        return prismaReview ? mapPrismaToClubReview(prismaReview) : null;
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
    public async createClubReview(
        input: CreateClubReviewInput,
    ): Promise<ClubReview> {
        const {userId, rating, text} = input;

        const prismaClubReview = await prisma.clubReview.create({
            data: {rating, text, userId},
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

    /**
     * Обновляет отзыв пользователя о клубе.
     *
     * @param input - Объект с данными для обновления отзыва.
     * @param input.userId - ID текущего пользователя (из JWT).
     * @param input.reviewId - ID отзыва для редактирования.
     * @param input.rating - оценка отзыва (опционально).
     * @param input.text - текст отзыва (опционально).
     * @throws NotFoundError(404) - отзыв по reviewId не найден.
     * @throws ForbiddenError(403) - отзыв не принадлежит пользователю.
     * @returns Обновлённый отзыв пользователя о клубе.
     */
    public async updateUserReviewClub(input: UpdateClubReview) {
        const existing = await prisma.clubReview.findUnique({
            where: {id: input.reviewId},
            select: {userId: true}
        });

        if (!existing) {
            throw new NotFoundError(`Отзыв с ${input.reviewId} не найден`);
        }

        if (input.userId !== existing.userId) {
            throw new ForbiddenError("Нельзя редактировать чужой отзыв");
        }

                const prismaReview = await prisma.clubReview.update({
                    where: {id: input.reviewId},
                    data: {
                        rating: input.rating,
                        text: input.text,
                    },
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

        return mapPrismaToClubReview(prismaReview);
    }
}
