import { Response, Router } from "express";
import { prisma } from "lib/prisma";
import { IRequest } from "types/IRequest";
import { withAuth } from "utils/auth/withAuth";
import { userProperties } from "utils/user/userProperties";

const router = Router();

router.get("/:guildId/:channelId", withAuth, async (req: IRequest, res: Response) => {
  const messages = await prisma.message.findMany({
    where: {
      channelId: req.params.channelId,
      guildId: req.params.guildId,
    },
    include: {
      user: {
        select: userProperties(),
      },
    },
  });

  return res.json({ messages });
});

export const messagesRouter = router;
