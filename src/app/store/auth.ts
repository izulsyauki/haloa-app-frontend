import { create } from "zustand";
import { User } from "../types/user";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set(() => ({ user: user }));
        localStorage.setItem("auth-storage", JSON.stringify(user));
      },
      clearUser: () => {
        set(() => ({ user: null }));
        localStorage.removeItem("auth-storage");
        window.location.reload();
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
