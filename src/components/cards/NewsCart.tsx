import { View, StyleSheet } from "react-native";
import { Article } from "@/utils/types/app.ts";
import React, { FC } from "react";
import { useThemeColors } from "@/theme";
import { lightColors } from "@/theme/colors.ts";
import FastImage from "@d11/react-native-fast-image";
import InterText from "@/components/texts/InterText.tsx";
import { InterWeightEnum } from "@/utils/enums/font.ts";
import ClockIcon from "@/assets/icons/clock.svg";
import { timeAgoFromString } from "@/utils/helper.ts";

type Props = {
  article: Article;
  index: number;
};

const NewsCart: FC<Props> = ({ article, index }) => {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <View style={[styles.container, index > 1 && { marginTop: 16 }]}>
      {article?.urlToImage ? (
        <FastImage
          style={styles.image}
          source={{
            uri: article.urlToImage,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <View
          style={[
            styles.image,
            {
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.grey200,
            },
          ]}
        >
          <InterText
            weight={InterWeightEnum.Medium}
            style={{
              fontSize: 14,
              color: colors.mainTextColor,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            No Image Available
          </InterText>
        </View>
      )}
      <View style={{ flexShrink: 1 }}>
        {article?.author && (
          <InterText
            style={styles.authorText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {article.author}
          </InterText>
        )}
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <InterText
            style={styles.titleText}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {article.title}
          </InterText>
          <View style={styles.newsInfo}>
            <InterText
              weight={InterWeightEnum.SemiBold}
              style={styles.sourceText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {article.source.name}
            </InterText>
            <View style={styles.timeInfo}>
              <ClockIcon width={14} height={14} color={colors.mainTextColor} />
              <InterText
                style={styles.timeText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {timeAgoFromString(article.publishedAt)}
              </InterText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewsCart;

function createStyles(colors: typeof lightColors) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: 8,
      gap: 8,
    },
    image: {
      width: 96,
      height: 96,
      borderRadius: 8,
    },
    authorText: {
      color: colors.secondTextColor,
      marginTop: 4,
    },
    titleText: {
      marginTop: 6,
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
