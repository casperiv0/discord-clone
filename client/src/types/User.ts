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
  status: StatusType;
  statusMessage: string | null;
  guildId: string | null;

  connections: Connection[];
}

export interface Connection {
  id: string;
  type: ConnectionType;
  userId: string | null;
  url: string;
  name: string;
}

export enum StatusType {
  ONLINE = "ONLINE",
  IDLE = "IDLE",
  DND = "DND",
  OFFLINE = "OFFLINE",
}
