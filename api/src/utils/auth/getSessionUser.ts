import { User } from ".prisma/client";
import { prisma } from "lib/prisma";

export async function getSessionUser(userId: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      avatar: true,
      bio: true,
      createdAt: true,
      email: true,
      id: true,
    },
  });

  return user as User | null;
}
