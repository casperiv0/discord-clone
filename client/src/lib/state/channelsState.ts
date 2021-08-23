import create from "zustand";
import { Channel } from "types/Channel";

export interface ChannelsStore {
  channels: Channel[];
  currentChannel: Channel | null;

  setCurrentChannel: (channel: Channel) => void;
  setChannels: (channels: Channel[]) => void;
  deleteChannel: (channel: Channel) => void;
}

export const useChannelsStore = create<ChannelsStore>((set, get) => ({
  channels: [],
  currentChannel: null,

  setCurrentChannel: (channel) => set({ currentChannel: channel }),
  setChannels: (channels) => set({ channels }),
  deleteChannel: (channel) => set({ channels: get().channels.filter((v) => v.id !== channel.id) }),
}));
