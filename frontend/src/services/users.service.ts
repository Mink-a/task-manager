import { User } from '@/schema/users.schema';
import { axiosInstance } from '@/utils/axios';

export const getUsers = async (params?: Record<string, unknown>) => {
  const response = await axiosInstance.get<ApiListResponse<User>>('/users', {
    params,
  });
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await axiosInstance.get<ApiListResponse<User>>(`/users/${id}`);
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await axiosInstance.patch(`/users/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};
