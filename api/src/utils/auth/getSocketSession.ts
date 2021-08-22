import { User } from ".prisma/client";
import { parse } from "cookie";
import { Socket } from "socket.io";
import { getSessionUser } from "./getSessionUser";
import { parseJWT } from "./parseJWT";

export const COOKIE_NAME = "discord-clone";

export async function getSocketSession(socket: Socket): Promise<User | null> {
  const cookie = parse(socket.request.headers?.cookie ?? "");

  if (!cookie[COOKIE_NAME]) return null;
  const userId = await parseJWT(cookie[COOKIE_NAME]!);
  if (!userId) return null;

  return getSessionUser(userId);
}
