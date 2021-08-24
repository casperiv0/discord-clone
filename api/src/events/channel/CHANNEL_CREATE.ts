import { prisma } from "lib/prisma";
import { Server, Socket } from "socket.io";
import { Event } from "structures/Event";
import { Events } from "types/Events";
import { getSocketSession } from "utils/auth/getSocketSession";

export interface CreateChannelData {
  guildId: string;
  channelId: string;
}

export default class CHANNEL_CREATE extends Event {
  constructor(server: Server) {
    super(server, Events.CHANNEL_CREATE);
  }

  async handle(socket: Socket, data: CreateChannelData) {
    if (!data.channelId || !data.guildId) return;
    const user = await getSocketSession(socket);
    if (!user) return;

    const channel = await prisma.channel.findUnique({
      where: {
        id: data.channelId,
      },
    });

    socket.broadcast.to(data.guildId).emit(Events.CHANNEL_CREATE, channel);
  }
}
