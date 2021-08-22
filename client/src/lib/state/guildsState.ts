import create from "zustand";
import { Guild } from "types/Guild";

export interface GuildsStore {
  guilds: Guild[];
  currentGuild: Guild | null;

  setCurrentGuild: (guild: Guild) => void;
  setGuilds: (guilds: Guild[]) => void;
}

export const useGuildStore = create<GuildsStore>((set) => ({
  guilds: [],
  currentGuild: null,

  setCurrentGuild: (guild) => set({ currentGuild: guild }),
  setGuilds: (guilds) => set({ guilds }),
}));
