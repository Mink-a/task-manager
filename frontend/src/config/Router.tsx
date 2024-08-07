import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardLayout } from '@/Layouts';
import { DashboardPage } from '@/pages/dashboard/Dashboard.page';
import { UsersPage } from '@/pages/users/Users.page';
import { TasksPage } from '@/pages/tasks/Task.page';
import { TaskTypesPage } from '@/pages/task-types/TaskType.page';
import { LoginPage } from '@/pages/auth/Login.page';
import { RootLayout } from '@/Layouts/RootLayout';
import { ActionsPage } from '@/pages/actions/Action.page';
import { RolesPage } from '@/pages/roles/Role.page';
import { MenusPage } from '@/pages/menus/Menu.page';

const router = createBrowserRouter([
  { path: '/', element: <RootLayout /> },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/d',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'tasks',
        element: <TasksPage />,
      },
      {
        path: 'task-types',
        element: <TaskTypesPage />,
      },
      {
        path: 'roles',
        element: <RolesPage />,
      },
      {
        path: 'actions',
        element: <ActionsPage />,
      },
      {
        path: 'menus',
        element: <MenusPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
