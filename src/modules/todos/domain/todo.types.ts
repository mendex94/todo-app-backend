import { z } from "zod";

export const todoSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string(),
  body: z.string(),
  completed: z.boolean(),
});

export type Todo = z.infer<typeof todoSchema>;
