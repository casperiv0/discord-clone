import { request } from "lib/fetch";
import { Channel } from "types/Channel";

export async function getChannelsForGuild(guildId: string, cookie?: string) {
  try {
    const res = await request(`/guilds/${guildId}/channels`, "GET", { cookie });

    return res.data.channels ?? [];
  } catch (e) {
    return [];
  }
}

export async function getChannelById(id: string, cookie?: string) {
  try {
    const res = await request(`/channels/${id}`, "GET", { cookie });

    return res.data.channel ?? [];
  } catch (e) {
    return [];
  }
}

type CreateChannelData = Pick<Channel, "name" | "type" | "guildId" | "parentId">;

export async function createChannel({ name, type, guildId, parentId }: CreateChannelData) {
  try {
    const res = await request(`/channels/${guildId}`, "POST", { name, type, parentId });

    return res.data.channel ?? null;
  } catch (e) {
    return null;
  }
}