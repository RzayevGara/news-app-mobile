import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import fonts from "@/theme/fonts";
import { InterWeightEnum } from "@/utils/enums/font.ts";
import { useThemeColors } from "@/theme";

interface InterTextProps extends TextProps {
  weight?: InterWeightEnum;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  onPress?: () => void;
}

const getFont = (weight: InterWeightEnum = InterWeightEnum.Regular) => {
  switch (weight) {
    case "thin":
      return fonts.interThin;
    case "extraLight":
      return fonts.interExtraLight;
    case "light":
      return fonts.interLight;
    case "regular":
      return fonts.interRegular;
    case "medium":
      return fonts.interMedium;
    case "semiBold":
      return fonts.interSemiBold;
    case "bold":
      return fonts.interBold;
    case "extraBold":
      return fonts.interExtraBold;
    case "black":
      return fonts.interBlack;
    default:
      return fonts.interRegular;
  }
};

const InterText: React.FC<InterTextProps> = ({
  weight = InterWeightEnum.Regular,
  style,
  children,
  onPress,
  ...rest
}) => {
  const colors = useThemeColors();

  return (
    <Text
      style={[
        { fontFamily: getFont(weight) },
        { color: colors.mainTextColor, includeFontPadding: false },
        style,
      ]}
      {...rest}
      allowFontScaling={false}
      onPress={onPress}
      suppressHighlighting={true}
    >
      {children}
    </Text>
  );
};

export default InterText;
