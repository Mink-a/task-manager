import { z } from 'zod';

export type User = z.infer<typeof userSchema>;

export const userSchema = z.object({
  id: z.string().optional(),
  loginId: z.string(),
  username: z.string(),
  roleId: z.string(),
  deptCode: z.string(),
});

export type UserWithRolePermissions = User & {
  Role: {
    id: string;
    name: string;
    Permissions: Permission[];
  };
};

export type Permission = { id: string; actionId: string; menuId: string; roleId: string };
