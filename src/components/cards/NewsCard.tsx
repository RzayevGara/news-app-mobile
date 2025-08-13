import React from "react";
import { StyleSheet, View } from "react-native";
import { Article } from "@/utils/types/app.ts";
import FastImage from "@d11/react-native-fast-image";
import InterText from "@/components/texts/InterText.tsx";
import { useThemeColors } from "@/theme";
import { InterWeightEnum } from "@/utils/enums/font.ts";
import { lightColors } from "@/theme/colors.ts";
import ClockIcon from "@/assets/icons/clock.svg";
import { timeAgoFromString } from "@/utils/helper.ts";

export default function NewsCard({ item }: { item: Article }) {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{ uri: item.urlToImage, priority: FastImage.priority.normal }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.textWrapper}>
        {item?.author && (
          <InterText style={styles.authorText}>{item.author}</InterText>
        )}
        <InterText
          weight={InterWeightEnum.Medium}
          style={styles.titleText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
        </InterText>
        <View style={styles.newsInfo}>
          <InterText
            weight={InterWeightEnum.Bold}
            style={styles.sourceText}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.source.name}
          </InterText>
          <View style={styles.timeInfo}>
            <ClockIcon width={14} height={14} color={colors.mainTextColor} />
            <InterText
              style={styles.sourceText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {timeAgoFromString(item.publishedAt)}
            </InterText>
          </View>
        </View>
      </View>
    </View>
  );
}

function createStyles(colors: typeof lightColors) {
  return StyleSheet.create({
    container: {
      marginTop: 16,
    },
    image: {
      width: "100%",
      height: 180,
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
