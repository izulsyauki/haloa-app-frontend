import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: unknown | null;
  token: string | null;
  setUser: (user: unknown) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
