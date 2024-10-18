import { prisma } from "../../../server/shared/db/prisma";
import { Todo } from "../domain/todo.types";

export default async function editTodo(todo: Partial<Todo>) {
  return prisma.task.update({
    where: {
      id: todo.id,
    },
    data: {
      ...todo,
    },
  });
}
