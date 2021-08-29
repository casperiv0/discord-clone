import create from "zustand";
import { Channel } from "types/Channel";

export interface ChannelsStore {
  channels: Channel[];
  currentChannel: Channel | null;

  setCurrentChannel: (channel: Channel | null) => void;
  setChannels: (channels: Channel[]) => void;
  deleteChannel: (channel: Channel | Pick<Channel, "id">) => void;
}

export const useChannelsStore = create<ChannelsStore>((set, get) => ({
  channels: [],
  currentChannel: null,

  setCurrentChannel: (channel) => set({ currentChannel: channel }),
  setChannels: (channels) => set({ channels }),
  deleteChannel: (channel) => {
    const channels = get().channels;
    const newChannels = [...channels]
      .map((ch) => {
        if (ch.parentId === channel.id) {
          ch.parentId = null;
        }

        return ch;
      })
      .filter((ch) => ch.id !== channel.id);

    set({ channels: newChannels });
  },
}));
