import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { lightColors } from "@/theme/colors.ts";
import { useThemeColors } from "@/theme";
import Dot from "./Dot";

interface AnimatedDotsProps {
  count: number;
  progress: number;
}

const AnimatedDots: FC<AnimatedDotsProps> = ({ count = 0, progress }) => {
  const colors = useThemeColors();
  const styles = getStyles(colors);

  return (
    <View style={styles.dotsContainer}>
      {Array.from({ length: count }).map((_, i) => (
        <Dot key={i} index={i} progress={progress} />
      ))}
    </View>
  );
};

function getStyles(colors: typeof lightColors) {
  return StyleSheet.create({
    dotsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 14,
    },
  });
}

export default AnimatedDots;
