import create from "zustand";
import { Channel } from "types/Channel";

export interface ChannelsStore {
  channels: Channel[];
  currentChannel: Channel | null;

  setCurrentChannel: (channel: Channel) => void;
  setChannels: (channels: Channel[]) => void;
}

export const useChannelsStore = create<ChannelsStore>((set) => ({
  channels: [],
  currentChannel: null,

  setCurrentChannel: (channel) => set({ currentChannel: channel }),
  setChannels: (channels) => set({ channels }),
}));
