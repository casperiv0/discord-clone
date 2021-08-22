import { request } from "lib/fetch";

export async function verifyAuth(cookie?: string) {
  try {
    const res = await request("/auth/user", "POST", { cookie });

    return res.data.user ?? null;
  } catch (e) {
    return null;
  }
}

export async function login(email: string, password: string): Promise<Error | string | null> {
  try {
    const res = await request("/auth/login", "POST", { email, password });

    return res.data.userId ?? null;
  } catch (e) {
    return e instanceof Error ? e : null;
  }
}
