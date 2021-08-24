import { request } from "lib/fetch";
import { Invite } from "types/Invite";

export async function generateGuildInvite(
  guildId: string,
  cookie?: string,
): Promise<Invite | null> {
  try {
    const res = await request(`/invites/${guildId}/generate`, "GET", { cookie });

    return res.data.invite ?? null;
  } catch (e) {
    return null;
  }
}
