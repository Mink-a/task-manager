import { Role } from '@/schema/role.schema';
import { axiosInstance } from '@/utils/axios';

export const getRoles = async (params?: Record<string, unknown>) => {
  const response = await axiosInstance.get<ApiListResponse<Role>>('/roles', {
    params,
  });
  return response.data;
};

export const createRole = async (role: Role) => {
  const response = await axiosInstance.post('/roles', role);
  return response.data;
};

export const updateRole = async (role: Role) => {
  const response = await axiosInstance.patch(`/roles/${role.id}`, role);
  return response.data;
};

export const deleteRole = async (id: string) => {
  const response = await axiosInstance.delete(`/roles/${id}`);
  return response.data;
};
