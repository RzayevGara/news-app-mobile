import { FlatList, View, StyleSheet } from "react-native";
import ScreenContainer from "@/components/views/ScreenContainer.tsx";
import TrendingSlider from "@/components/home/TrendingSlider.tsx";
import { lightColors } from "@/theme/colors.ts";
import { useThemeColors } from "@/theme";
import { useTrendingNews } from "@/hooks/useTrendingNews.ts";

const HomeScreen = () => {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  const { isLoading, isRefreshing, onRefresh } = useTrendingNews();

  return (
    <ScreenContainer>
      <FlatList
        data={[]}
        renderItem={<View></View>}
        ListHeaderComponent={<TrendingSlider isLoading={isLoading} />}
        style={styles.container}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
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
