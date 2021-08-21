import { User } from "./User";

export interface Message {
  id: string;
  guildId: string;
  channelId: string;

  content: string;

  // todo:
  components: any[];

  user: User;
}
