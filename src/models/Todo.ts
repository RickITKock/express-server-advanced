import { z } from "zod";

export const Todo = z.object({
  id: z.string(),
  todo: z.string(),
});

export const Todos = z.array(Todo);
