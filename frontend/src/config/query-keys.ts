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
