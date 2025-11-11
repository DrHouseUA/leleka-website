import { UserData } from "@/types/user";
import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  user: UserData | null;
  setUser: (user: UserData) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: UserData) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));