import { prisma } from "../../../server/shared/db/prisma";

export default async function createUser(user: { name: string; email: string; password: string }) {
  return prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });
}
