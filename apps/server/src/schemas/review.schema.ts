import { z } from "zod";

export const getClubReviewQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  take: z.coerce.number().int().min(1).max(8).default(8),
});

export const createClubReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  text: z.string().trim().min(50).max(2000),
});

export const updateClubReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  text: z.string().trim().min(50).max(2000).optional(),
}).refine(data =>
    data.rating !== undefined || data.text !== undefined,
    {message: "Необходимо передать хотя бы одно поле для обновления"});