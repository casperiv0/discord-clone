import { validateSchema } from "@casper124578/utils";
import { Response, Router } from "express";
import { prisma } from "lib/prisma";
import { createGuildSchema } from "schemas/guild";
import { IRequest } from "types/IRequest";
import { withAuth } from "utils/auth/withAuth";
import { userProperties } from "utils/user/userProperties";

const router = Router();

router.get("/@me", withAuth, async (req: IRequest, res: Response) => {
  const guilds = await prisma.guild.findMany({
    where: {
      OR: [
        {
          ownerId: {
            equals: req.userId,
          },
        },
        {
          members: {
            some: {
              id: req.userId!,
            },
          },
        },
      ],
    },
    include: {
      members: {
        select: userProperties(),
      },
    },
  });

  return res.json({ guilds });
});

router.get("/:id", withAuth, async (req: IRequest, res: Response) => {
  const guild = await prisma.guild.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      members: {
        select: userProperties(),
      },
    },
  });

  return res.json({ guild });
});

router.get("/:id/channels", withAuth, async (req: IRequest, res: Response) => {
  const channels = await prisma.channel.findMany({
    where: {
      guildId: req.params.id,
    },
  });

  return res.json({ channels });
});

router.post("/", withAuth, async (req: IRequest, res: Response) => {
  const [error] = await validateSchema<typeof createGuildSchema>(createGuildSchema, {
    name: req.body.name,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const guild = await prisma.guild.create({
    data: {
      name: req.body.name,
      ownerId: req.userId!,
      members: {
        connect: {
          id: req.userId,
        },
      },
    },
  });

  return res.json({ guild });
});

router.delete("/:id", withAuth, async (req: IRequest, res: Response) => {
  await prisma.guild.delete({
    where: {
      id: req.params.id!,
    },
    include: {
      messages: true,
    },
  });

  return res.status(200).send();
});

export const guildRouter = router;
