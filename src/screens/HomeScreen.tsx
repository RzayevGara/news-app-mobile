import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import ScreenContainer from "@/components/views/ScreenContainer.tsx";
import TrendingSlider from "@/components/home/TrendingSlider.tsx";
import { lightColors } from "@/theme/colors.ts";
import { useThemeColors } from "@/theme";
import { useTrendingNews } from "@/hooks/useTrendingNews.ts";
import React, { useCallback, useState } from "react";
import { Article } from "@/utils/types/app.ts";
import NewsCategoryBar from "@/components/home/NewsCategoryBar.tsx";
import { NewsCategory, NewsType } from "@/utils/enums/app.enum.ts";
import { useNewsList } from "@/hooks/useNewsList.ts";
import NewsCart from "@/components/cards/NewsCart.tsx";
import InterText from "@/components/texts/InterText.tsx";
import { InterWeightEnum } from "@/utils/enums/font.ts";
import CartSkeletonAnimation from "@/components/home/CartSkeletonAnimation.tsx";

const HomeScreen = () => {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  const [activeCat, setActiveCat] = useState<NewsCategory>(
    NewsCategory.business
  );
  const { isLoading, isRefreshing, fetchTrends } = useTrendingNews();

  const {
    articles,
    hasMore,
    isLoading: isNewsLoading,
    isRefreshing: isNewsRefreshing,
    isLoadingMore,
    loadMore,
    fetchPage: fetchNews,
  } = useNewsList({ category: activeCat, pageSize: 7 });

  const renderItem = ({ item, index }: { item: Article; index: number }) => {
    if (index === 0 && !isNewsLoading) {
      return (
        <View style={{ backgroundColor: colors.background }}>
          <NewsCategoryBar
            activeCat={activeCat}
            onChange={setActiveCat}
            isNewsLoading={isNewsLoading}
          />
          <CartSkeletonAnimation />
        </View>
      );
    }
    if (item.type === NewsType.category) {
      return (
        <NewsCategoryBar
          activeCat={activeCat}
          onChange={setActiveCat}
          isNewsLoading={isNewsLoading}
        />
      );
    } else if (!isNewsLoading) {
      return <NewsCart article={item} index={index} />;
    } else {
      return <View></View>;
    }
  };

  const renderEmptyComponent = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <InterText
          weight={InterWeightEnum.Medium}
          style={{ fontSize: 16, textAlign: "center" }}
        >
          No News Available!
        </InterText>
      </View>
    );
  };

  const listFooter = () => {
    if (!isLoadingMore) return <View></View>;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color={colors.mainTextColor} />
      </View>
    );
  };

  const onRefresh = useCallback(() => {
    Promise.all([
      fetchNews(1, { refreshing: true }),
      fetchTrends({ refreshing: true }),
    ]);
  }, [fetchNews, fetchTrends]);

  return (
    <ScreenContainer>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) =>
          item.type === NewsType.category ? NewsType.category : item.id
        }
        ListHeaderComponent={<TrendingSlider isLoading={isLoading} />}
        ListFooterComponent={listFooter}
        style={styles.container}
        contentContainerStyle={{ backgroundColor: colors.background }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing || isNewsRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.mainTextColor}
            colors={[colors.mainTextColor]}
            progressBackgroundColor={colors.background}
          />
        }
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.6}
        onEndReached={() => {
          if (hasMore) loadMore();
        }}
        ListEmptyComponent={renderEmptyComponent}
      />
    </ScreenContainer>
  );
};

export default HomeScreen;

function createStyles(colors: typeof lightColors) {
  return StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginTop: 10,
    },
    footer: {
      paddingVertical: 16,
      alignItems: "center",
      justifyContent: "center",
      height: 200,
    },
  });
}
