import { request } from "lib/fetch";
import { Guild } from "types/Guild";

export async function getGuilds(cookie?: string): Promise<Guild[]> {
  try {
    const res = await request("/guilds/@me", "GET", { cookie });

    return res.data.guilds ?? [];
  } catch (e) {
    return [];
  }
}

export async function getGuild(guildId: string, cookie?: string): Promise<Guild | null> {
  try {
    const res = await request(`/guilds/${guildId}`, "GET", { cookie });

    return res.data.guild ?? null;
  } catch (e) {
    return null;
  }
}

export async function createGuild(name: string): Promise<Guild | null> {
  try {
    const res = await request("/guilds", "POST", { name });

    return res.data.guild ?? null;
  } catch (e) {
    return null;
  }
}
