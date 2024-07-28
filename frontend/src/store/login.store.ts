import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LoginResponse } from '@/schema/login.schema';

export type LoginStore = {
  userInfo: LoginResponse | null;
  setUser: (user: LoginResponse) => void;
  removeUser: () => void;
};

export const useLoginStore = create<LoginStore>()(
  persist(
    (set) => ({
      userInfo: null,
      setUser: (userInfo: LoginResponse) => set({ userInfo }),
      removeUser: () => set({ userInfo: null }),
    }),
    {
      name: 'login-store',
    }
  )
);
