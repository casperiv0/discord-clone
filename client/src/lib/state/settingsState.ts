import create from "zustand";

export interface SettingsStore {
  activeTab: number;
  isOpen: boolean;

  setActiveTab: (id: number) => void;
  setOpen: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  isOpen: false,
  activeTab: 0,

  setActiveTab: (id) => set({ activeTab: id }),
  setOpen: (v) => set({ isOpen: v }),
}));
