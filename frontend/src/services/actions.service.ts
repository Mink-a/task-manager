import { Action } from '@/schema/action.schema';
import { axiosInstance } from '@/utils/axios';

export const getActions = async (params?: Record<string, unknown>) => {
  const response = await axiosInstance.get<ApiListResponse<Action>>('/actions', {
    params,
  });
  return response.data;
};

export const createAction = async (values: Action) => {
  const response = await axiosInstance.post('/actions', values);
  return response.data;
};

export const updateAction = async (values: Action) => {
  const response = await axiosInstance.patch(`/actions/${values.id}`, values);
  return response.data;
};

export const deleteAction = async (id: string) => {
  const response = await axiosInstance.delete(`/actions/${id}`);
  return response.data;
};
