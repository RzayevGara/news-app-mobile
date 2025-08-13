import { darkColors, lightColors } from "@/theme/colors.ts";
import { useTheme } from "@/store/useTheme.ts";

export const useThemeColors = () => {
  const colorScheme = useTheme((state) => state.theme);
  return colorScheme === "dark" ? darkColors : lightColors;
};
