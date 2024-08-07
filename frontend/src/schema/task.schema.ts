import { z } from 'zod';
import { TaskType } from './task-type.schema';
import { User } from './users.schema';

export const taskSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().min(1, { message: 'Title is required!' }),
    taskTypeId: z.union([
      z.coerce.string().min(1, { message: 'Task type is required!' }),
      z.null(),
    ]),
    date: z.coerce.date(),
    startTime: z.string(),
    endTime: z.string(),
    userId: z.union([z.coerce.string().min(1, { message: 'User is required!' }), z.undefined()]),
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

export type TaskWithTaskType = Task & {
  TaskType: TaskType;
};

export type TaskWithTaskTypeAndUser = Task & {
  TaskType: TaskType;
  User: User;
};
