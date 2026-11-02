import {prisma} from "../../lib/prisma";
import {mapPrismaToClubReview} from "../mappers/review.mapper";
import type {ClubReview} from "@knigolub/shared";
import type {GetReviewsOptions} from "../models/get-reviews-options.model";

export class ReviewService {
    /**
     * Возвращает список отзывов о клубе.
     *
     * @param options - Объект с параметрами пагинации.
     * @param options.take - Количество отзывов для выборки (ожидается число).
     * @param options.skip - Количество пропускаемых отзывов (ожидается число).
     * @returns Массив отзывов о клубе, готовых для отправки клиенту.
     */
    public async getClubReviews(options: GetReviewsOptions): Promise<ClubReview[]> {
        const prismaReviews = await prisma.clubReview.findMany({
            take: options.take,
            skip: options.skip,
            orderBy: {createdAt: 'desc'},
            select: {
                id: true,
                text: true,
                rating: true,
                user: {
                    select: {
                        username: true,
                        avatarUrl: true
                    }
                }
            }
        });

        return prismaReviews.map(mapPrismaToClubReview);
    }
}