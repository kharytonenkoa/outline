import { create } from "zustand";

type HomePageContextStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useHomePageContext = create<HomePageContextStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));