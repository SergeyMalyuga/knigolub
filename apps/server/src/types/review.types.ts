import type {Prisma} from "../../generated/prisma/client"

export type ClubReviewWithUser = Prisma.ClubReviewGetPayload<{
    select: {
        id: true;
        text: true;
        rating: true;
        user: {
            select: {
                username: true;
                avatarUrl: true;
            }
        }
    }
}>