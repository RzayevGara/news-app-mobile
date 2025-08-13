import { Appearance } from "react-native";

export const useIsDark = (): boolean => {
  const colorScheme = Appearance.getColorScheme();
  return colorScheme === "dark";
};
