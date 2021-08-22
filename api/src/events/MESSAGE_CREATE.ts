import { Server } from "socket.io";
import { Event } from "structures/Event";
import { Events } from "types/Events";

export interface MessageCreateEventData {
  guildId: string;
  channelId: string;
  content: string;
}

export default class MESSAGE_CREATE extends Event {
  constructor(server: Server) {
    super(server, Events.MESSAGE_CREATE);
  }

  async handle(e: MessageCreateEventData) {
    console.log(e);

    // this.server.to()

    this.server.sockets.emit("MESSAGE_CREATE", { data: "hello" });
  }
}
