import { TaskType } from '@/schema/task-type.schema';
import { axiosInstance } from '@/utils/axios';

export const getTaskTypes = async (params?: Record<string, unknown>) => {
  const response = await axiosInstance.get<ApiListResponse<TaskType>>('/task-types', {
    params,
  });
  return response.data;
};

export const createTaskType = async (taskType: Omit<TaskType, 'id'>) => {
  const response = await axiosInstance.post('/task-types', taskType);
  return response.data;
};

export const updateTaskType = async (taskType: TaskType) => {
  const response = await axiosInstance.patch(`/task-types/${taskType.id}`, taskType);
  return response.data;
};

export const deleteTaskType = async (id: number) => {
  const response = await axiosInstance.delete(`/task-types/${id}`);
  return response.data;
};
