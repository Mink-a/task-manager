import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/d');
  }, [navigate]);

  return <Outlet />;
}
