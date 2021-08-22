import create from "zustand";
import { Message } from "types/Message";

export interface MessagesStore {
  messages: Message[];

  setMessages: (messages: Message[]) => void;
}

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
}));
