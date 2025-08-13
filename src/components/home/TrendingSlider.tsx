import { View } from "react-native";
import InterText from "@/components/texts/InterText.tsx";
import { InterWeightEnum } from "@/utils/enums/font.ts";
import { useNews } from "@/store/useNews.ts";
import SwiperSlider from "@/components/slider/SwiperSlider.tsx";
import NewsCard from "@/components/cards/NewsCard.tsx";
import { Article } from "@/utils/types/app.ts";
import { FC } from "react";

type Props = {
  isLoading: boolean;
};

const TrendingSlider: FC<Props> = ({ isLoading }) => {
  const trends = useNews((s) => s.trends);

  const renderNewsItem = (item: Article, index: number) => (
    <NewsCard item={item} />
  );

  return (
    <View>
      <InterText weight={InterWeightEnum.SemiBold} style={{ fontSize: 16 }}>
        Trending
      </InterText>
      <SwiperSlider
        data={trends}
        isLoading={isLoading}
        renderItem={renderNewsItem}
      />
    </View>
  );
};

export default TrendingSlider;
