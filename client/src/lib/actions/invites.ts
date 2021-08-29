import { request } from "lib/fetch";
import { Guild } from "types/Guild";
import { Invite } from "types/Invite";

export async function generateGuildInvite(
  guildId: string,
  cookie?: string,
): Promise<Invite | null> {
  try {
    const res = await request(`/invites/${guildId}/generate`, "GET", { cookie });

    return res.data.invite ?? null;
  } catch {
    return null;
  }
}

export async function getInviteInfo(
  inviteId: string,
  cookie?: string,
): Promise<(Invite & { guild: Guild }) | null> {
  try {
    const res = await request(`/invites/${inviteId}`, "GET", { cookie }, "text");

    return res.data.invite ?? null;
  } catch {
    return null;
  }
}

export async function acceptGuildInvite(inviteId: string) {
  try {
    await request(`/invites/${inviteId}`, "POST");

    return true;
  } catch {
    return false;
  }
}
