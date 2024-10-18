import { listTodos, listTodosCached, saveTodosCache } from "../repository/list-todos.repository";

export default async function listTodosHandler({ userId }: { userId: string }) {
  const cachedTodos = await listTodosCached({ userId });

  if (cachedTodos.length) {
    return cachedTodos;
  }

  const todos = await listTodos({
    userId,
  });

  await saveTodosCache({ userId, todos });

  return todos;
}
