import { User } from '@/schema/users.schema';
import { axiosInstance } from '@/utils/axios';

export const getUsers = async (params?: Record<string, unknown>) => {
  const response = await axiosInstance.get<ApiListResponse<User>>('/users', {
    params,
  });
  return response.data;
};
