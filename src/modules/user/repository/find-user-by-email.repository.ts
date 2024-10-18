import { prisma } from "../../../server/shared/db/prisma";

export default async function findUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
}
