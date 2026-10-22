import {z} from "zod";

export const updateUserSchema = z.object({
  firstName: z.string().optional().or(z.literal('')).transform((val) => (val === '' ? undefined : val)).optional(),
  lastName: z.string().optional().or(z.literal('')).transform((val) => (val === '' ? undefined : val)).optional(),
  birthday: z.string().optional().or(z.literal('')).transform((val) => {
    if (val === '' || val === undefined) return undefined;
    return new Date(val);
  }).optional(),
  bio: z.string().optional().or(z.literal('')).or(z.literal('')).transform((val) => (val === '' ? undefined : val)).optional(),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;

