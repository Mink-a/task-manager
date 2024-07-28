import { create } from 'zustand';

type DrawerState = {
  opened: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export const useDrawer = create<DrawerState>()((set) => ({
  opened: false,
  toggle: () => set((state) => ({ opened: !state.opened })),
  open: () => set(() => ({ opened: true })),
  close: () => set(() => ({ opened: false })),
}));
