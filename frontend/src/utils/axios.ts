import axios from 'axios';
import { useLoginStore } from '@/store/login.store';
import { refresh } from '@/services/login.service';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  timeout: 1500,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { userInfo } = useLoginStore.getState();
    if (userInfo) {
      config.headers.Authorization = `Bearer ${userInfo.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const { userInfo } = useLoginStore.getState();
      if (userInfo?.refresh_token) {
        refresh(userInfo.refresh_token).then((data) => {
          useLoginStore.getState().setUser(data);
        });
      }
    }
    return Promise.reject(error);
  }
);
