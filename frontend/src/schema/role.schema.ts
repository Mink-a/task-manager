import { z } from 'zod';

export type Role = z.infer<typeof roleSchema>;

export const roleSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Title is required!' }),
  Permissions: z.array(z.object({ actionId: z.string(), menuId: z.string() })),
});
