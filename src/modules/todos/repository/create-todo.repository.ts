import { prisma } from "../../../server/shared/db/prisma";

export default async function createTodo({ title, body, userId }: { title: string; body: string; userId: string }) {
  return prisma.task.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
