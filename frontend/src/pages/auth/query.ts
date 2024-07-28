import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import { login } from '@/services/login.service';
import { LoginResponse, type Login } from '@/schema/login.schema';
import { useLoginStore } from '@/store/login.store';

export const useLoginMutation = () => {
  const setUser = useLoginStore((state) => state.setUser);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (values: Login) => login(values),
    onSuccess: (data: LoginResponse) => {
      setUser(data);
      navigate('/d');
    },
    onError: () => {
      console.log('Login Error');
      showNotification({
        title: 'Login failed',
        message: 'Login failed',
        color: 'red',
      });
    },
  });
};
