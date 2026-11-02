import {z} from "zod";

export const getReviewQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    take: z.coerce.number().int().min(1).max(8).default(8),
});

export type GetReviewQuery = z.infer<typeof getReviewQuerySchema>;