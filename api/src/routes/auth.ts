import { Request, Response, Router } from "express";
import { validateSchema } from "@casper124578/utils";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { prisma } from "lib/prisma";
import { createSessionToken } from "utils/auth/createSessionToken";
import { setCookie } from "utils/auth/setCookie";
import { deleteAccountSchema, loginSchema, registerSchema } from "schemas/auth";
import { generateTag } from "utils/user/generateTag";
import { withAuth } from "utils/auth/withAuth";
import { IRequest } from "types/IRequest";
import { getSessionUser } from "utils/auth/getSessionUser";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const [error] = await validateSchema<typeof loginSchema>(loginSchema, {
    email,
    password,
  });

  if (error) {
    return res.status(400).json({
      error: error.message,
      status: "error",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({
      error: "User was not found",
      status: "error",
    });
  }

  const isPwCorrect = compareSync(password, user.password);
  if (!isPwCorrect) {
    return res.status(400).json({
      error: "Password is invalid",
      status: "error",
    });
  }

  const token = createSessionToken(user.id);
  setCookie(token, res);

  return res.json({ userId: user.id });
});

router.post("/register", async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  const [error] = await validateSchema<typeof registerSchema>(registerSchema, {
    email,
    name,
    password,
  });

  if (error) {
    return res.status(400).json({
      error: error.message,
      status: "error",
    });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    return res.status(404).json({
      error: "That email is already in-use. Please specify a different email.",
      status: "error",
    });
  }

  const hash = hashSync(password, genSaltSync(15));

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
      tag: generateTag(),
      username: name,
    },
  });

  const token = createSessionToken(createdUser.id);
  setCookie(token, res);

  return res.json({ userId: createdUser.id });
});

router.patch("/profile", withAuth, async (req: IRequest, res: Response) => {
  try {
    const { avatar, bio, status, statusMessage } = req.body;

    const user = await getSessionUser(req.userId!);

    await prisma.user.update({
      where: {
        id: req.userId!,
      },
      data: {
        avatar: typeof avatar === "undefined" ? user?.avatar : avatar,
        bio: typeof bio === "undefined" ? user?.bio : bio,
        status: typeof status === "undefined" ? user?.status : status,
        statusMessage,
      },
    });

    return res.status(200).send();
  } catch (err) {
    return res.status(500).send();
  }
});

router.patch("/user", withAuth, async (req: IRequest, res: Response) => {
  const { avatarUrl, username } = req.body;

  await prisma.user.update({
    where: {
      id: req.userId!,
    },
    data: {
      avatar: avatarUrl,
      username,
    },
  });

  return res.status(200).send();
});

router.post("/user", withAuth, async (req: IRequest, res: Response) => {
  const user = await getSessionUser(req.userId!);

  return res.json({ user });
});

router.delete("/user", withAuth, async (req: IRequest, res: Response) => {
  const { password } = req.body;

  const [error] = await validateSchema<typeof deleteAccountSchema>(deleteAccountSchema, {
    password,
  });

  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.userId!,
    },
    select: {
      password: true,
    },
  });

  const isPwCorrect = compareSync(password, user!.password);
  if (!isPwCorrect) {
    return res.status(400).json({
      error: "Password is invalid",
    });
  }

  await prisma.user.delete({
    where: {
      id: req.userId,
    },
  });

  req.userId = undefined;

  return res.status(200).send();
});

export const authRouter = router;
