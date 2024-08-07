import { z } from 'zod';

export type Action = z.infer<typeof actionSchema>;

export const actionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Title is required!' }),
});
