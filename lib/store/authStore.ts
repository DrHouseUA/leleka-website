import { UserData } from "@/types/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStore = {
  isAuthenticated: boolean;
  user: UserData | null;
  setUser: (user: UserData) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user: UserData) => {
        set(() => ({ user, isAuthenticated: true }));
      },
      clearIsAuthenticated: () => {
        set(() => ({ user: null, isAuthenticated: false }));
      },
    }),
    {
      name: "auth-storage", // ім'я в localStorage
      storage: createJSONStorage(() => localStorage),
      // Зберігаємо тільки базову інформацію
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
