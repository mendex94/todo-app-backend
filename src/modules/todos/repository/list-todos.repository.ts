import { prisma } from "../../../server/shared/db/prisma";
import { redis } from "../../../server/shared/db/redis";
import { Todo } from "../domain/todo.types";

export async function listTodos({ userId }: { userId: string }) {
  return prisma.task.findMany({
    where: {
      userId,
    },
  });
}

export async function listTodosCached({ userId }: { userId: string }): Promise<Todo[] | []> {
  const todos = await redis.get(`todos:${userId}`);

  return todos ? JSON.parse(todos) : [];
}

export async function saveTodosCache({ userId, todos }: { userId: string; todos: Todo[] }) {
  await redis.set(`todos:${userId}`, JSON.stringify(todos));
}

export async function invalidateTodosCache({ userId }: { userId: string }) {
  await redis.del(`todos:${userId}`);
}
