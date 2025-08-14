import React from "react";
import { View, StyleProp, ViewStyle, ViewProps, TextStyle } from "react-native";
import InterText from "@/components/texts/InterText";
import { InterWeightEnum } from "@/utils/enums/font";
import { useThemeColors } from "@/theme";

type EmptyImageProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const EmptyImage: React.FC<EmptyImageProps> = ({ style, textStyle }) => {
  const colors = useThemeColors();

  return (
    <View
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.grey200,
          width: "100%",
          height: 180,
          borderRadius: 8,
        },
        style,
      ]}
    >
      <InterText
        weight={InterWeightEnum.Medium}
        style={[{ fontSize: 18, color: colors.mainTextColor }, textStyle]}
      >
        No Image Available
      </InterText>
    </View>
  );
};

export default EmptyImage;
