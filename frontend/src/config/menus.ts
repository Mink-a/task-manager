import {
  IconChecklist,
  IconHome,
  IconLockAccess,
  IconUserCheck,
  IconUsers,
} from '@tabler/icons-react';
import { SCOPES } from './permissions';

export const MENUS = [
  {
    label: 'Dashboard',
    icon: IconHome,
    to: '/d',
    scopes: [SCOPES.canView],
    page: 'dashboard',
  },
  {
    label: 'Users',
    icon: IconUsers,
    to: '/d/users',
    scopes: [SCOPES.canView],
    page: 'users',
  },
  {
    label: 'Tasks',
    icon: IconChecklist,
    to: '/d/tasks',
    scopes: [SCOPES.canView],
    page: 'tasks',
  },
  {
    label: 'Task Types',
    icon: IconChecklist,
    to: '/d/task-types',
    scopes: [SCOPES.canView],
    page: 'task-types',
  },
  {
    label: 'Security',
    icon: IconLockAccess,
    to: '/d/security',
    children: [
      {
        label: 'Roles',
        icon: IconUserCheck,
        to: '/d/roles',
        scopes: [SCOPES.canView],
        page: 'roles',
      },
      {
        label: 'Actions',
        icon: IconUserCheck,
        to: '/d/actions',
        scopes: [SCOPES.canView],
        page: 'actions',
      },
      {
        label: 'Menus',
        icon: IconUserCheck,
        to: '/d/menus',
        scopes: [SCOPES.canView],
        page: 'menus',
      },
    ],
  },
];
