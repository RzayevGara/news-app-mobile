import { Appearance } from "react-native";
import { darkColors, lightColors } from "@/theme/colors.ts";

export const useThemeColors = () => {
  const colorScheme = Appearance.getColorScheme();
  return colorScheme === "dark" ? darkColors : lightColors;
};
