import { Menu } from '@/schema/menu.schema';
import { axiosInstance } from '@/utils/axios';

export const getMenus = async (params?: Record<string, unknown>) => {
  const response = await axiosInstance.get<ApiListResponse<Menu>>('/menus', {
    params,
  });
  return response.data;
};

export const createMenu = async (menu: Menu) => {
  const response = await axiosInstance.post('/menus', menu);
  return response.data;
};

export const updateMenu = async (menu: Menu) => {
  const response = await axiosInstance.patch(`/menus/${menu.id}`, menu);
  return response.data;
};

export const deleteMenu = async (id: string) => {
  const response = await axiosInstance.delete(`/menus/${id}`);
  return response.data;
};
