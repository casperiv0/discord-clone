import { validateSchema } from "@casper124578/utils";
import { Response, Router } from "express";
import { prisma } from "lib/prisma";
import { channelSchema } from "schemas/channel";
import { IRequest } from "types/IRequest";
import { withAuth } from "utils/auth/withAuth";

const router = Router();

router.get("/:id", withAuth, async (req: IRequest, res: Response) => {
  const channel = await prisma.channel.findUnique({
    where: {
      id: req.params.id,
    },
  });

  return res.json({ channel });
});

router.post("/:guildId", withAuth, async (req: IRequest, res: Response) => {
  const [error] = await validateSchema<typeof channelSchema>(channelSchema, req.body);

  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  const channel = await prisma.channel.create({
    data: {
      name: req.body.name,
      type: req.body.type,
      guildId: req.params.guildId,
    },
  });

  return res.json({ channel });
});

export const channelRouter = router;
