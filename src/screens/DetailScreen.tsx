import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import ScreenContainer from "@/components/views/ScreenContainer.tsx";
import { CompositeScreenProps } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "@/navigation/MainStack.tsx";
import { MainStackRoutes } from "@/utils/enums/route-names.ts";
import { RootStackParamList } from "@/navigation/RootNavigator.tsx";
import { FC, useEffect, useState } from "react";
import InterText from "@/components/texts/InterText.tsx";
import { lightColors } from "@/theme/colors.ts";
import { useThemeColors } from "@/theme";
import { InterWeightEnum } from "@/utils/enums/font.ts";
import { timeAgoFromString } from "@/utils/helper.ts";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import BookmarkCheckedIcon from "@/assets/icons/bookmark-checked.svg";
import FastImage from "@d11/react-native-fast-image";
import RenderHTML from "react-native-render-html";

type DetailProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, MainStackRoutes.DetailStack>,
  NativeStackScreenProps<RootStackParamList, MainStackRoutes.MainStack>
>;

const DetailScreen: FC<DetailProps> = ({ route: { params } }) => {
  const article = params.article;
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const { width } = useWindowDimensions();

  const [ratio, setRatio] = useState(16 / 9);

  useEffect(() => {
    if (!article.fields?.thumbnail) return;
    Image.getSize(
      article.fields.thumbnail,
      (w, h) => setRatio(w / h),
      () => setRatio(16 / 9)
    );
  }, [article]);

  return (
    <ScreenContainer>
      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={{ gap: 6, flex: 1 }}>
          <InterText
            weight={InterWeightEnum.SemiBold}
            style={{ fontSize: 16, maxWidth: "50%" }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {article.sectionName}
          </InterText>
          <InterText style={{ fontSize: 14, color: colors.secondTextColor }}>
            {timeAgoFromString(article.webPublicationDate)}
          </InterText>
        </View>
        <Pressable>
          <BookmarkIcon color={colors.mainTextColor} />
        </Pressable>
      </View>
      <ScrollView
        style={{ marginTop: 16, height: "100%" }}
        contentContainerStyle={[
          styles.container,
          {
            paddingBottom: 40,
          },
        ]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <FastImage
          style={{ width: "100%", aspectRatio: ratio, borderRadius: 8 }}
          source={{
            uri: article?.fields?.thumbnail,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{ marginTop: 16, gap: 10 }}>
          <InterText
            style={{ fontSize: 14, color: colors.secondTextColor }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {article.fields?.byline}
          </InterText>
          <InterText style={{ fontSize: 24, color: colors.mainTextColor }}>
            {article.webTitle}
          </InterText>
        </View>
        <RenderHTML
          contentWidth={width}
          source={{ html: (article.fields as any).body }}
          baseStyle={{
            fontSize: 16,
            lineHeight: 24,
            color: colors.secondTextColor,
          }}
          tagsStyles={{
            p: { marginTop: 20 },
            a: { textDecorationLine: "underline" },
          }}
          defaultTextProps={{ selectable: true }}
          ignoredDomTags={["script", "style"]}
          enableExperimentalMarginCollapsing
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default DetailScreen;

function createStyles(colors: typeof lightColors) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      marginTop: 10,
    },
  });
}
