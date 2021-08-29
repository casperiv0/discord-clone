import { Response, Router } from "express";
import { v4 } from "uuid";
import { IRequest } from "types/IRequest";
import { withAuth } from "utils/auth/withAuth";
import { prisma } from "lib/prisma";

const router = Router();

router.get("/:guildId/generate", withAuth, async (req: IRequest, res: Response) => {
  const code = v4().slice(0, 8);

  const guild = await prisma.guild.findUnique({ where: { id: req.params.guildId } });

  if (!guild) {
    return res.status(404).send("Unknown Guild");
  }

  const invite = await prisma.invite.create({
    data: {
      code,
      guildId: req.params.guildId!,
      userId: req.userId!,
    },
  });

  return res.json({ invite });
});

router.get("/:code", withAuth, async (req: IRequest, res: Response) => {
  const code = req.params.code as string;

  const invite = await prisma.invite.findUnique({
    where: {
      code,
    },
    include: {
      guild: true,
    },
  });

  return res.json({ invite });
});

router.post("/:id", withAuth, async (req: IRequest, res: Response) => {
  const id = req.params.id as string;

  const invite = await prisma.invite.findUnique({
    where: {
      id,
    },
  });

  if (!invite) {
    return res.status(404).send();
  }

  await prisma.guild.update({
    where: {
      id: invite.guildId,
    },
    data: {
      members: {
        connect: {
          id: req.userId!,
        },
      },
    },
  });

  return res.status(200).send({});
});

export const inviteRouter = router;
