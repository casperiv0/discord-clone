import { User } from "./User";

export interface Message {
  id: string;
  content: string;
  userId: string;
  channelId: string;
  guildId: string;
  user: User;
}
