import { User } from ".prisma/client";
import { prisma } from "lib/prisma";
import { userProperties } from "utils/user/userProperties";

export async function getSessionUser(userId: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: userProperties(),
  });

  return user as User | null;
}
