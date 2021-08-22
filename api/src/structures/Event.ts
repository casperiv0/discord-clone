import { Server, Socket } from "socket.io";

export abstract class Event {
  server: Server;
  name: string;

  constructor(server: Server, name: string) {
    this.server = server;
    this.name = name;

    this.handle = this.handle.bind(this);
  }

  abstract handle(socket: Socket, ...args: any[]): Promise<unknown>;
}
