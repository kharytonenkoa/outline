import { create } from "zustand";

type NavigationStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNavigation = create<NavigationStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));