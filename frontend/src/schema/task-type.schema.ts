import { z } from 'zod';

export type TaskType = z.infer<typeof taskTypeSchema>;

export const taskTypeSchema = z.object({ name: z.string(), id: z.number().optional() });
