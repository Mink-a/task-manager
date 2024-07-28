import { z } from 'zod';
import { User } from './users.schema';

export type Login = z.infer<typeof loginSchema>;

export type LoginResponse = {
  user: User;
  access_token: string;
  refresh_token: string;
};

export const loginSchema = z.object({
  loginId: z.string().min(3, { message: 'Login ID must be at least 3 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});
