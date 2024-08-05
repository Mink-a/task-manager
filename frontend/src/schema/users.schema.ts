import { z } from 'zod';

export type User = z.infer<typeof userSchema>;

export const userSchema = z.object({
  id: z.string().optional(),
  loginId: z.string(),
  username: z.string(),
  password: z.string(),
  role: z.string(),
  phone: z.string(),
  email: z.string(),
});
