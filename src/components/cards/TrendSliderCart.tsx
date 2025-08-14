import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Article } from "@/utils/types/app.ts";
import FastImage from "@d11/react-native-fast-image";
import InterText from "@/components/texts/InterText.tsx";
import { useThemeColors } from "@/theme";
import { InterWeightEnum } from "@/utils/enums/font.ts";
import { lightColors } from "@/theme/colors.ts";
import ClockIcon from "@/assets/icons/clock.svg";
import { timeAgoFromString } from "@/utils/helper.ts";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { MainStackRoutes } from "@/utils/enums/route-names.ts";
import EmptyImage from "@/components/shared/EmptyImage.tsx";

export default function TrendSliderCart({ item }: { item: Article }) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const colors = useThemeColors();
  const styles = createStyles(colors);

  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(MainStackRoutes.MainStack, {
          screen: MainStackRoutes.DetailStack,
          params: { article: item },
        })
      }
    >
      <View style={styles.container}>
        {item?.fields?.thumbnail && !imageError ? (
          <FastImage
            style={styles.image}
            source={{
              uri: item?.fields?.thumbnail,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onError={() => setImageError(true)}
          />
        ) : (
          <EmptyImage />
        )}
        <View style={styles.textWrapper}>
          {item?.fields?.byline && (
            <InterText style={styles.authorText}>
              {item?.fields?.byline}
            </InterText>
          )}
          <InterText
            weight={InterWeightEnum.Medium}
            style={styles.titleText}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.webTitle}
          </InterText>
          <View style={styles.newsInfo}>
            <InterText
              weight={InterWeightEnum.Bold}
              style={styles.sourceText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.sectionName}
            </InterText>
            <View style={styles.timeInfo}>
              <ClockIcon width={14} height={14} color={colors.mainTextColor} />
              <InterText
                style={styles.timeText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {timeAgoFromString(item.webPublicationDate)}
              </InterText>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function createStyles(colors: typeof lightColors) {
  return StyleSheet.create({
    container: {
      marginTop: 16,
    },
    image: {
      width: "100%",
      height: 200,
      borderRadius: 8,
    },
    authorText: {
      color: colors.secondTextColor,
    },
    textWrapper: {
      marginTop: 10,
    },
    titleText: {
      marginTop: 8,
      fontSize: 16,
    },
    sourceText: {
      fontSize: 14,
      maxWidth: "50%",
    },
    timeText: {
      fontSize: 14,
    },
    newsInfo: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
      gap: 14,
    },
    timeInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
  });
}
