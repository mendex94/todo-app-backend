import deleteTodo from "../repository/delete-todo.repository";
import { invalidateTodosCache } from "../repository/list-todos.repository";

export default async function deleteTodoHandler({ todoId }: { todoId: string }) {
  const deletedTodo = await deleteTodo({
    todoId,
  });

  if (!deletedTodo) {
    throw new Error("Todo not deleted");
  }

  await invalidateTodosCache({ userId: deletedTodo.userId });

  return deletedTodo;
}
