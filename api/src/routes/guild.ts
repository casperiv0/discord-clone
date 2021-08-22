import { validateSchema } from "@casper124578/utils";
import { Response, Router } from "express";
import { prisma } from "lib/prisma";
import { createGuildSchema } from "schemas/guild";
import { IRequest } from "types/IRequest";
import { withAuth } from "utils/auth/withAuth";

const router = Router();

router.get("/@me", withAuth, async (req: IRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      guilds: true,
    },
  });

  return res.json({ guilds: user?.guilds ?? [] });
});

router.get("/:id", withAuth, async (req: IRequest, res: Response) => {
  const guild = await prisma.guild.findUnique({
    where: {
      id: req.params.id,
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
    },
  });

  return res.json({ guild });
});

export const guildRouter = router;
