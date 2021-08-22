import { request } from "lib/fetch";

export async function getMessagesInChannel(guildId: string, channelId: string, cookie?: string) {
  try {
    const res = await request(`/messages/${guildId}/${channelId}`, "GET", { cookie });

    return res.data.messages ?? [];
  } catch (e) {
    return [];
  }
}
