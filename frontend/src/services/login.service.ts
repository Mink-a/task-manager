import { Login } from '@/schema/login.schema';
import { axiosInstance } from '@/utils/axios';

export const login = async (values: Login) => {
  const response = await axiosInstance.post('/auth/login', {
    loginId: values.loginId,
    password: values.password,
  });
  return response.data;
};

export const refresh = async (refreshToken: string) => {
  const response = await axiosInstance.post('/auth/refresh', {
    refresh_token: refreshToken,
  });
  return response.data;
};
