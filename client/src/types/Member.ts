import { User } from "./User";

export interface GuildMember {
  user: User;

  userId: string;
  guildId: string;

  nickname: string | null;
  roles_ids: string[];
}
