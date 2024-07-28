import { z } from 'zod';
import { User } from './users.schema';
import { TaskType } from './task-type.schema';

export const taskSchema = z
  .object({
    id: z.number().optional(),
    title: z.string().min(1, { message: 'Title is required!' }),
    taskTypeId: z.union([
      z.coerce.number().min(1, { message: 'Task type is required!' }),
      z.null(),
    ]),
    date: z.coerce.date(),
    startTime: z.string(),
    endTime: z.string(),
    userId: z.union([z.coerce.number().min(1, { message: 'User is required!' }), z.undefined()]),
  })
  .superRefine((data, ctx) => {
    if (data.taskTypeId === null) {
      ctx.addIssue({
        path: ['taskTypeId'],
        message: 'Task type is required!',
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.userId === undefined) {
      ctx.addIssue({
        path: ['userId'],
        message: 'User is required!',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type Task = z.infer<typeof taskSchema>;

export type CreateTask = Omit<Task, 'id'>;

export type TaskWithUser = Task & {
  user: User;
};

export type TaskWithTaskType = Task & {
  taskType: TaskType;
};
