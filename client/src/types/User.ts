export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
  password: string;
  createdAt: Date;
  name: string;
  tag: number;
  bio: string | null;
  status: string | null;
  guildId: string | null;
}
