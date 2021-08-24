import { request } from "lib/fetch";
import { Channel } from "types/Channel";

export async function getChannelsForGuild(guildId: string, cookie?: string): Promise<Channel[]> {
  try {
    const res = await request(`/guilds/${guildId}/channels`, "GET", { cookie });

    return res.data.channels ?? [];
  } catch (e) {
    return [];
  }
}

export async function getChannelById(id: string, cookie?: string): Promise<Channel | null> {
  try {
    const res = await request(`/channels/${id}`, "GET", { cookie });

    return res.data.channel ?? null;
  } catch (e) {
    return null;
  }
}

type CreateChannelData = Pick<Channel, "name" | "type" | "guildId" | "parentId">;

export async function createChannel({
  name,
  type,
  guildId,
  parentId,
}: CreateChannelData): Promise<Channel | null> {
  try {
    const res = await request(`/channels/${guildId}`, "POST", { name, type, parentId });

    return res.data.channel ?? null;
  } catch (e) {
    return null;
  }
}

export async function deleteChannel(id: string): Promise<null> {
  try {
    await request(`/channels/${id}`, "DELETE");

    return null;
  } catch (e) {
    return null;
  }
}
