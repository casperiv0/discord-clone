import { Router } from "express";
import { authRouter } from "./auth";
import { channelRouter } from "./channel";
import { guildRouter } from "./guild";
import { inviteRouter } from "./invite";
import { messagesRouter } from "./messages";

const router = Router();

router.use("/auth", authRouter);
router.use("/guilds", guildRouter);
router.use("/channels", channelRouter);
router.use("/messages", messagesRouter);
router.use("/invites", inviteRouter);

export const apiRouter = router;
