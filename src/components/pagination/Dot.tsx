import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useThemeColors } from "@/theme";
import { lightColors } from "@/theme/colors.ts";

interface DotProps {
  index: number;
  progress: number;
}

const Dot: React.FC<DotProps> = ({ index, progress }) => {
  const colors = useThemeColors();
  const styles = getStyles(colors);

  const outerStyle = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1];
    const scale = interpolate(progress, inputRange, [0.6, 1, 0.6]);
    const opacity = interpolate(progress, inputRange, [0, 1, 0]);
    return {
      opacity,
      transform: [{ scale }],
    };
  }, [progress]);

  const innerStyle = useAnimatedStyle(() => {
    const isActive = Math.abs(progress - index) < 0.5;
    return {
      backgroundColor: isActive ? colors.blue500 : colors.grey700,
      transform: [{ scale: withTiming(1, { duration: 200 }) }],
    };
  }, [progress, colors]);

  return (
    <View style={styles.dotWrapper}>
      <Animated.View
        style={[styles.outerRing, { borderColor: colors.blue500 }, outerStyle]}
      />
      <Animated.View style={[styles.dot, innerStyle]} />
    </View>
  );
};

function getStyles(colors: typeof lightColors) {
  return StyleSheet.create({
    dotWrapper: {
      alignItems: "center",
      justifyContent: "center",
      margin: 4,
    },
    outerRing: {
      position: "absolute",
      width: 13,
      height: 13,
      borderRadius: 100,
      borderWidth: 1,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 100,
      backgroundColor: colors.grey700,
    },
  });
}

export default Dot;
