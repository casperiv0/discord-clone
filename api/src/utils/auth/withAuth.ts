import { NextFunction, Response } from "express";
import { IRequest } from "types/IRequest";
import { getSessionUser } from "./getSessionUser";
import { COOKIE_NAME } from "./getSocketSession";
import { parseJWT } from "./parseJWT";

export async function withAuth(
  req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const cookie = req.cookies[COOKIE_NAME];

    const userId = await parseJWT(cookie);
    if (!userId) {
      return res.status(401).send();
    }

    const user = await getSessionUser(userId);
    if (!user) {
      return res.status(401).send();
    }

    req.userId = user.id;

    return next();
  } catch (err) {
    return res.status(401).send();
  }
}
