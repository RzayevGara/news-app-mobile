import { FlatList, View, StyleSheet } from "react-native";
import ScreenContainer from "@/components/views/ScreenContainer.tsx";
import TrendingSlider from "@/components/home/TrendingSlider.tsx";
import { lightColors } from "@/theme/colors.ts";
import { useThemeColors } from "@/theme";
import { useTrendingNews } from "@/hooks/useTrendingNews.ts";
import { useState } from "react";
import { NewsCategory } from "@/services/news.ts";
import { Article } from "@/utils/types/app.ts";
import InterText from "@/components/texts/InterText.tsx";
import NewsCategoryBar from "@/components/home/NewsCategoryBar.tsx";
import { NewsType } from "@/utils/enums/app.enum.ts";

const HomeScreen = () => {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  const [activeCat, setActiveCat] = useState<NewsCategory>(
    NewsCategory.business
  );
  const { isLoading, isRefreshing, onRefresh } = useTrendingNews();

  const renderItem = ({ item }: { item: Article }) => {
    if (item.type === NewsType.category) {
      return <NewsCategoryBar activeCat={activeCat} onChange={setActiveCat} />;
    }
    return (
      <View>
        <InterText>{item.title}</InterText>
      </View>
    );
  };

  return (
    <ScreenContainer>
      <FlatList
        data={[{ type: NewsType.category }]}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item.type === NewsType.category ? NewsType.category : index
        }
        ListHeaderComponent={<TrendingSlider isLoading={isLoading} />}
        style={styles.container}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

export default HomeScreen;

function createStyles(colors: typeof lightColors) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      marginTop: 10,
    },
  });
}
