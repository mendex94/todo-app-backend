import { Todo } from "../domain/todo.types";
import editTodo from "../repository/edit-todo.repository";
import { invalidateTodosCache } from "../repository/list-todos.repository";

export default async function editTodoHandler({ todoId, todo }: { todoId: string; todo: Partial<Todo> }) {
  const updatedTodo = await editTodo({
    id: todoId,
    ...todo,
  });

  if (!updatedTodo) {
    throw new Error("Todo not updated");
  }

  await invalidateTodosCache({ userId: updatedTodo.userId });

  return updatedTodo;
}
