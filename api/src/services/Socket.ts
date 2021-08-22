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

  constructor() {
    this.io = new Server(SOCKET_OPTIONS);

    this.listen();
    this.init();
  }

  async init() {
    this.events = await loadEvents(this.io);

    this.io.on("connection", (socket) => {
      this.events.forEach((event) => {
        socket.on(event.name, event.handle);
      });
    });
  }

  listen() {
    const port = parseInt(process.env.SOCKET_PORT ?? "3030");
    this.io.listen(port);

    console.log("Socket was started.");
  }
}
