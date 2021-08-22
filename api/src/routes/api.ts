import { Router } from "express";
import { authRouter } from "./auth";
import { channelRouter } from "./channel";
import { guildRouter } from "./guild";
import { messagesRouter } from "./messages";

const router = Router();

router.use("/auth", authRouter);
router.use("/guilds", guildRouter);
router.use("/channels", channelRouter);
router.use("/messages", messagesRouter);

export const apiRouter = router;
