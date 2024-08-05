import { Task, TaskWithTaskType } from '@/schema/task.schema';
import { axiosInstance } from '@/utils/axios';

export const getTasks = async (params?: Record<string, unknown>) => {
  const response = await axiosInstance.get<ApiListResponse<TaskWithTaskType>>('/tasks', {
    params,
  });
  return response.data;
};

export const createTask = async (values: Omit<Task, 'id'>) => {
  const response = await axiosInstance.post('/tasks', {
    ...values,
  });
  return response.data;
};

export const updateTask = async (values: Task) => {
  const { id, ...task } = values;
  const response = await axiosInstance.patch(`/tasks/${id}`, {
    ...task,
  });
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};
