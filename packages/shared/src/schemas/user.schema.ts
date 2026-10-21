import {z} from "zod";

export const updateUserSchema = z.object({
  firstName: z.string().optional().or(z.literal('')).transform((val) => (val === '' ? undefined : val)).optional(),
  lastName: z.string().optional().or(z.literal('')).transform((val) => (val === '' ? undefined : val)).optional(),
  birthday: z.iso.date().optional().or(z.literal('')).transform((val) => (val === '' ? undefined : val)).optional(),
  bio: z.string().optional().or(z.literal('')).or(z.literal('')).transform((val) => (val === '' ? undefined : val)).optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

