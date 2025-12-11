import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeType = "day" | "night";

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "day",
      setTheme: (theme: ThemeType) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "day" ? "night" : "day",
        })),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
