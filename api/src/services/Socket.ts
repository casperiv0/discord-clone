import { Application } from "express";
import { Server, ServerOptions } from "socket.io";
import { Event } from "structures/Event";
import { loadEvents } from "utils/loadEvents";

const SOCKET_OPTIONS: Partial<ServerOptions> = {
  cors: {
    origin: "http://localhost:3000",
  },
};

export class SocketService {
  private io: Server;
  private events: Map<string, Event> = new Map();

  constructor(expressServer: Application) {
    const port = parseInt(process.env.API_PORT ?? "3030");

    this.io = new Server(
      expressServer.listen(port, () => {
        console.log("Socket & Server are running.");
      }),
      SOCKET_OPTIONS,
    );

    this.init();
  }

  async init() {
    this.events = await loadEvents(this.io);

    this.io.on("connection", (socket) => {
      this.events.forEach((event) => {
        socket.on(event.name, event.handle.bind(null, socket));
      });
    });
  }
}
