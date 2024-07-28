import { IconChecklist, IconHome, IconUsers } from '@tabler/icons-react';
import { SCOPES } from './permissions';

export const MENUS = [
  {
    label: 'Dashboard',
    icon: IconHome,
    to: '/d',
    scopes: [SCOPES.canView],
  },
  {
    label: 'Users',
    icon: IconUsers,
    to: '/d/users',
    scopes: [SCOPES.canView],
  },
  {
    label: 'Tasks',
    icon: IconChecklist,
    to: '/d/tasks',
    scopes: [SCOPES.canView],
  },
  {
    label: 'Task Types',
    icon: IconChecklist,
    to: '/d/task-types',
    scopes: [SCOPES.canView],
  },
];
