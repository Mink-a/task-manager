export const users = {
  all: ['users'] as const,
  lists: () => [...users.all, 'list'] as const,
  list: (filters: string | Record<string, unknown>) => [...users.lists(), { filters }] as const,
  details: () => [...users.all, 'detail'] as const,
  detail: (id: string | undefined) => [...users.details(), id] as const,
};

export const task = {
  all: ['task'] as const,
  lists: () => [...task.all, 'list'] as const,
  list: (filters: string | Record<string, unknown>) => [...task.lists(), { filters }] as const,
  details: () => [...task.all, 'detail'] as const,
  detail: (id: string | undefined) => [...task.details(), id] as const,
};

export const taskType = {
  all: ['task-type'] as const,
  lists: () => [...taskType.all, 'list'] as const,
  list: (filters: string | Record<string, unknown>) => [...taskType.lists(), { filters }] as const,
  details: () => [...taskType.all, 'detail'] as const,
  detail: (id: string | undefined) => [...taskType.details(), id] as const,
};

export const role = {
  all: ['role'] as const,
  lists: () => [...role.all, 'list'] as const,
  list: (filters: string | Record<string, unknown>) => [...role.lists(), { filters }] as const,
  details: () => [...role.all, 'detail'] as const,
  detail: (id: string | undefined) => [...role.details(), id] as const,
};

export const menu = {
  all: ['menu'] as const,
  lists: () => [...menu.all, 'list'] as const,
  list: (filters: string | Record<string, unknown>) => [...menu.lists(), { filters }] as const,
  details: () => [...menu.all, 'detail'] as const,
  detail: (id: string | undefined) => [...menu.details(), id] as const,
};

export const action = {
  all: ['action'] as const,
  lists: () => [...action.all, 'list'] as const,
  list: (filters: string | Record<string, unknown>) => [...action.lists(), { filters }] as const,
  details: () => [...action.all, 'detail'] as const,
  detail: (id: string | undefined) => [...action.details(), id] as const,
};
