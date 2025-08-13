import React from "react";
import { Platform, StatusBar, StyleSheet, View, ViewProps } from "react-native";
import { useThemeColors } from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightColors } from "@/theme/colors.ts";
import { useTheme } from "@/store/useTheme.ts";

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children }) => {
  const theme = useTheme((state) => state.theme);
  const colors = useThemeColors();
  const styles = getStyles(colors);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        edges={["left", "right", "bottom"]}
        style={[styles.wrapper]}
      >
        {Platform.OS === "android" && (
          <StatusBar
            barStyle={theme === "dark" ? "light-content" : "dark-content"}
          />
        )}
        {children}
      </SafeAreaView>
    </View>
  );
};

function getStyles(colors: typeof lightColors) {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.background,
      paddingBottom: 0,
    },
  });
}

export default ScreenContainer;
