import type { ClubReview } from "@knigolub/shared";
import type { ClubReviewWithUser } from "../types/review.types";

export function mapPrismaToClubReview(review: ClubReviewWithUser): ClubReview {
  return {
    id: review.id,
    text: review.text,
    rating: review.rating,
    author: {
      name: review.user.username,
      avatarUrl: review.user.avatarUrl,
    },
  };
}
