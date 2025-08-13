import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";

type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

const deviceScheme = (Appearance.getColorScheme?.() ?? "light") as Theme;

export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: deviceScheme,
      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
