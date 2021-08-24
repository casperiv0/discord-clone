import { Server, Socket } from "socket.io";
import { Event } from "structures/Event";
import { Events } from "types/Events";
import { getSocketSession } from "utils/auth/getSocketSession";

export interface CreateChannelData {
  guildId: string;
  channelId: string;
}

export default class CHANNEL_DELETE extends Event {
  constructor(server: Server) {
    super(server, Events.CHANNEL_DELETE);
  }

  async handle(socket: Socket, data: CreateChannelData) {
    if (!data.channelId || !data.guildId) return;
    const user = await getSocketSession(socket);
    if (!user) return;

    socket.broadcast.to(data.guildId).emit(Events.CHANNEL_DELETE, data.channelId);

    const roomName = `${data.guildId}_${data.channelId}`;
    this.server.socketsLeave(roomName);
  }
}
