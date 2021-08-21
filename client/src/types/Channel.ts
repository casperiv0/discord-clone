export interface Channel {
  id: string;
  guildId: string;
  name: string;

  parentId: string | null;
  type: ChannelType;
}

export type ChannelType = "GUILD_CATEGORY" | "GUILD_TEXT" | "GUILD_VOICE";
