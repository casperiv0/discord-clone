import { Server, Socket } from "socket.io";
import { Event } from "structures/Event";
import { Events } from "types/Events";
import { getSocketSession } from "utils/auth/getSocketSession";

export interface JoinChannelData {
  guildId: string;
  channelId: string;
}

export default class JOIN_CHANNEL extends Event {
  constructor(server: Server) {
    super(server, Events.JOIN_CHANNEL);
  }

  async handle(socket: Socket, data: JoinChannelData) {
    if (!data.channelId || !data.guildId) return;
    const user = await getSocketSession(socket);
    if (!user) return;

    const roomName = `${data.guildId}_${data.channelId}`;

    await socket.join(roomName);
  }
}
