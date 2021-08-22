import jwt from "jsonwebtoken";

const secret = process.env["JWT_SECRET"] as string;

export async function parseJWT(cookie: string) {
  try {
    const vToken = jwt.verify(cookie, secret);

    return vToken as string;
  } catch (e) {
    return null;
  }
}
