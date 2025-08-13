import { View } from "react-native";
import InterText from "@/components/texts/InterText.tsx";
import { InterWeightEnum } from "@/utils/enums/font.ts";
import { useNews } from "@/store/useNews.ts";
import SwiperSlider from "@/components/slider/SwiperSlider.tsx";
import TrendSliderCart from "@/components/cards/TrendSliderCart.tsx";
import { Article } from "@/utils/types/app.ts";
import { FC } from "react";

type Props = {
  isLoading: boolean;
};

const TrendingSlider: FC<Props> = ({ isLoading }) => {
  const trends = useNews((s) => s.trends);

  const renderNewsItem = (item: Article, index: number) => (
    <TrendSliderCart item={item} />
  );

  return (
    <View style={{ marginBottom: 22 }}>
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
