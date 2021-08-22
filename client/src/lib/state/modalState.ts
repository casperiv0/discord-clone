import create from "zustand";

export interface ModalStore {
  openModals: number[];

  isOpen: (id: number) => boolean;
  openModal: (id: number) => void;
  closeModal: (id: number) => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  openModals: [],

  isOpen: (id) => get().openModals.includes(id),
  openModal: (id) => set({ openModals: [...get().openModals, id] }),
  closeModal: (id) => set({ openModals: get().openModals.filter((v) => v !== id) }),
}));
