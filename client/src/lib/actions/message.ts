import { request } from "lib/fetch";
import { Message } from "types/Message";

export async function getMessagesInChannel(
  guildId: string,
  channelId: string,
  cookie?: string,
): Promise<Message[]> {
  try {
    const res = await request(`/messages/${guildId}/${channelId}`, "GET", { cookie });

    return res.data.messages ?? [];
  } catch (e) {
    return [];
  }
}
