import { z } from 'zod';

export type Menu = z.infer<typeof menuSchema>;

export const menuSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Title is required!' }),
});
