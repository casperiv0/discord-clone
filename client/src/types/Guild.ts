import { Channel } from "./Channel";
import { User } from "./User";

export interface Guild {
  id: string;
  name: string;
  icon: string | null;
  ownerId: string;
  owner: User;
  members: User[];
  channels: Channel[];
}
