import { resolve } from "node:path";
import { Server } from "socket.io";
import { globby } from "globby";
import { Event } from "structures/Event";

export async function loadEvents(server: Server) {
  const paths = await globby("./src/events/**/*.ts");

  const map = new Map<string, Event>();

  for (const path of paths) {
    delete require.cache[path];

    const resolved = resolve(path);

    const File = await (await import(resolved)).default;
    const event = new File(server) as Event;

    map.set(event.name, event);
  }

  return map;
}
