// permissions.js
export const ROLES = {
  user: 'user',
  admin: 'admin',
};

export const SCOPES = {
  canCreate: 'can-create',
  canEdit: 'can-edit',
  canDelete: 'can-delete',
  canView: 'can-view',
};

export const PAGE = {
  dashboard: 'dashboard',
  tasks: 'tasks',
  users: 'users',
  taskTypes: 'task-types',
};

export const PERMISSIONS = {
  [ROLES.user]: {
    [PAGE.dashboard]: [SCOPES.canView],
    [PAGE.tasks]: [SCOPES.canView, SCOPES.canCreate, SCOPES.canEdit, SCOPES.canDelete],
    [PAGE.users]: [],
    [PAGE.taskTypes]: [],
  },
  [ROLES.admin]: {
    [PAGE.dashboard]: [SCOPES.canView],
    [PAGE.tasks]: [SCOPES.canView, SCOPES.canCreate, SCOPES.canEdit, SCOPES.canDelete],
    [PAGE.users]: [SCOPES.canView, SCOPES.canCreate, SCOPES.canEdit, SCOPES.canDelete],
    [PAGE.taskTypes]: [SCOPES.canView, SCOPES.canCreate, SCOPES.canEdit, SCOPES.canDelete],
  },
};
