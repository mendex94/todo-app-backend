import { prisma } from "../../../server/shared/db/prisma";

export default async function deleteTodo({ todoId }: { todoId: string }) {
  return prisma.task.delete({
    where: {
      id: todoId,
    },
  });
}
