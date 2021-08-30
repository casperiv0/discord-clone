import { request } from "lib/fetch";
import { User } from "types/User";

export async function verifyAuth(cookie?: string): Promise<User | null> {
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

export async function updateUserAccount(data: Partial<User>): Promise<Error | boolean> {
  try {
    await request("/auth/user", "PATCH", data);

    return true;
  } catch (e) {
    return e instanceof Error ? e : false;
  }
}

export async function updateUserProfile(data: Partial<User>): Promise<Error | User | null> {
  try {
    const res = await request("/auth/profile", "PATCH", data);

    return res.data.user ?? null;
  } catch (e) {
    return e instanceof Error ? e : null;
  }
}

export async function deleteAccount(password: string): Promise<boolean> {
  try {
    await request("/auth/user", "DELETE", { password });

    return true;
  } catch {
    return false;
  }
}
