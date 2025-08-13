import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
} from "react-native";
import { useThemeColors } from "@/theme";
import { lightColors } from "@/theme/colors.ts";
import AnimatedDots from "@/components/pagination/AnimatedDots.tsx";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { Article } from "@/utils/types/app.ts";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;
const CARD_HEIGHT = 370;

interface SwiperSliderProps {
  data: Article[];
  renderItem: (item: Article, index: number) => React.ReactNode;
  isLoading: boolean;
  onItemChange?: (item: Article) => void;
}

const SwiperSlider: React.FC<SwiperSliderProps> = ({
  data,
  renderItem,
  isLoading,
  onItemChange,
}) => {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dotIndex, setDotIndex] = useState<number>(0);
  const listRef = useRef<FlatList<Article>>(null);

  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const discreteIndex = Math.round(offsetX / CARD_WIDTH);

    if (data[discreteIndex]) {
      setActiveIndex(discreteIndex);
      onItemChange?.(data[discreteIndex]);
    }
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    setDotIndex(offsetX / CARD_WIDTH);
  };

  if (isLoading) {
    return (
      <View
        style={{
          width: CARD_WIDTH,
          height: 300,
          paddingHorizontal: 8,
          marginTop: 16,
        }}
      >
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width="100%"
            height={180}
            borderRadius={8}
          />
          <View style={{ marginTop: 10 }}>
            <SkeletonPlaceholder.Item
              width="30%"
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              width="100%"
              height={20}
              borderRadius={4}
              marginTop={8}
            />
            <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
              <SkeletonPlaceholder.Item
                width="30%"
                height={20}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width={20}
                height={20}
                borderRadius={100}
                marginLeft={4}
              />
              <SkeletonPlaceholder.Item
                width="15%"
                height={20}
                borderRadius={4}
              />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.cardContainer}>
        <FlatList
          ref={listRef}
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          initialScrollIndex={activeIndex || 0}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.cardWrapper}>
              {renderItem(item, index)}
            </View>
          )}
        />
        <AnimatedDots count={data.length} progress={dotIndex} />
      </View>
    </View>
  );
};

function createStyles(colors: typeof lightColors) {
  return StyleSheet.create({
    cardContainer: {
      backgroundColor: colors.background,
      borderRadius: 16,
      paddingBottom: 16,
      overflow: "hidden",
    },
    cardWrapper: {
      paddingTop: 10,
      paddingHorizontal: 8,
      width: CARD_WIDTH,
      backgroundColor: colors.background,
      borderRadius: 12,
    },
    emptyCardWrapper: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      justifyContent: "center",
      alignItems: "center",
    },
  });
}

export default React.memo(SwiperSlider);
