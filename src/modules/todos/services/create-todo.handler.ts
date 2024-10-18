import createTodo from "../repository/create-todo.repository";
import { invalidateTodosCache } from "../repository/list-todos.repository";

export default async function createTodoHandler({
  title,
  body,
  userId,
}: {
  title: string;
  body: string;
  userId: string;
}) {
  const todo = await createTodo({
    title,
    body,
    userId,
  });

  if (!todo) {
    throw new Error("Todo not created");
  }

  await invalidateTodosCache({ userId });

  return todo;
}
