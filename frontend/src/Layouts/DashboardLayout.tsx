import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/common/header/Header';
import { useAuthedRoute } from '@/hooks/useAuth';

export function DashboardLayout() {
  useAuthedRoute();
  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 250, breakpoint: 'sm' }}>
      <Header />
      <Sidebar />
      <AppShell.Main style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
