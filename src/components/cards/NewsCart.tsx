import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Article } from "@/utils/types/app.ts";
import React, { FC, useState } from "react";
import { useThemeColors } from "@/theme";
import { lightColors } from "@/theme/colors.ts";
import FastImage from "@d11/react-native-fast-image";
import InterText from "@/components/texts/InterText.tsx";
import { InterWeightEnum } from "@/utils/enums/font.ts";
import ClockIcon from "@/assets/icons/clock.svg";
import { timeAgoFromString } from "@/utils/helper.ts";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { MainStackRoutes } from "@/utils/enums/route-names.ts";
import EmptyImage from "@/components/shared/EmptyImage.tsx";

type Props = {
  article: Article;
  index: number;
};

const NewsCart: FC<Props> = ({ article, index }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const colors = useThemeColors();
  const styles = createStyles(colors);

  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(MainStackRoutes.MainStack, {
          screen: MainStackRoutes.DetailStack,
          params: { article },
        })
      }
    >
      <View style={[styles.container, index > 1 && { marginTop: 16 }]}>
        {article?.fields?.thumbnail && !imageError ? (
          <FastImage
            style={styles.image}
            source={{
              uri: article.fields.thumbnail,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onError={() => setImageError(true)}
          />
        ) : (
          <EmptyImage
            style={styles.image}
            textStyle={{
              fontSize: 14,
              color: colors.mainTextColor,
              textAlign: "center",
              lineHeight: 20,
            }}
          />
        )}
        <View style={{ flexShrink: 1 }}>
          {article?.fields?.byline && (
            <InterText
              style={styles.authorText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {article.fields.byline}
            </InterText>
          )}
          <View style={{ justifyContent: "space-between", flex: 1 }}>
            <InterText
              style={styles.titleText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {article.webTitle}
            </InterText>
            <View style={styles.newsInfo}>
              <InterText
                weight={InterWeightEnum.SemiBold}
                style={styles.sourceText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {article.sectionName}
              </InterText>
              <View style={styles.timeInfo}>
                <ClockIcon
                  width={14}
                  height={14}
                  color={colors.mainTextColor}
                />
                <InterText
                  style={styles.timeText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {timeAgoFromString(article.webPublicationDate)}
                </InterText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
