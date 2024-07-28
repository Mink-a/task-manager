import { Outlet } from 'react-router-dom';
import { useAuthedRoute } from '@/hooks/useAuth';

export function AuthedLayout() {
  useAuthedRoute();
  return <Outlet />;
}
