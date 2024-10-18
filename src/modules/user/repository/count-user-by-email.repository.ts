import { prisma } from "../../../server/shared/db/prisma";

export default async function countUserByEmail(email: string) {
  return prisma.user.count({
    where: {
      email,
    },
  });
}
