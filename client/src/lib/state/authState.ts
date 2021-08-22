import create from "zustand";
import { User } from "types/User";

export interface AuthStore {
  user: User | null;

  setUser: (u: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  setUser: (u) => set({ user: u }),
}));
