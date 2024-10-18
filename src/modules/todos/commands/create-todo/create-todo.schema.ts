import { z } from "zod";

export const createTodoDtoSchema = z.object({
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(500),
});

export type CreateTodoDto = z.infer<typeof createTodoDtoSchema>;
