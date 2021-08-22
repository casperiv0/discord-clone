import { Server, Socket } from "socket.io";
import { prisma } from "lib/prisma";
import { Event } from "structures/Event";
import { Events } from "types/Events";
import { getSocketSession } from "utils/auth/getSocketSession";

export interface MessageCreateEventData {
  guildId: string;
  channelId: string;
  content: string;
}

export default class MESSAGE_CREATE extends Event {
  constructor(server: Server) {
    super(server, Events.MESSAGE_CREATE);
  }

  async handle(socket: Socket, data: MessageCreateEventData) {
    if (!data.channelId || !data.guildId || !data.content) return;
    const user = await getSocketSession(socket);
    if (!user) return;

    const roomName = `${data.guildId}_${data.channelId}`;

    const message = await prisma.message.create({
      data: {
        content: data.content,
        channelId: data.channelId,
        guildId: data.guildId,
        userId: user.id,
      },
    });

    console.log(message);

    await socket.join(roomName);
    socket.broadcast.to(roomName).emit(Events.MESSAGE_CREATE, { message });
  }
}
