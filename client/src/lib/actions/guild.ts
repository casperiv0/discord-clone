import { request } from "lib/fetch";

export async function getGuilds(cookie?: string) {
  try {
    const res = await request("/guilds/@me", "GET", { cookie });

    return res.data.guilds ?? [];
  } catch (e) {
    return [];
  }
}

export async function getGuild(guildId: string, cookie?: string) {
  try {
    const res = await request(`/guilds/${guildId}`, "GET", { cookie });

    return res.data.guild ?? null;
  } catch (e) {
    return null;
  }
}

export async function createGuild(name: string) {
  try {
    const res = await request("/guilds", "POST", { name });

    return res.data.guild ?? null;
  } catch (e) {
    return null;
  }
}
