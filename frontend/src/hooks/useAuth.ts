import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '@/store/login.store';

export function useAuthedRoute() {
  const navigate = useNavigate();
  const userInfo = useLoginStore((state) => state.userInfo);
  const accessToken = userInfo?.access_token;

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);
}

export function useAuthRoute() {
  const navigate = useNavigate();
  const userInfo = useLoginStore((state) => state.userInfo);
  const accessToken = userInfo?.access_token;

  useEffect(() => {
    if (accessToken) {
      navigate('/d');
    }
  }, [accessToken, navigate]);
}
