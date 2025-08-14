import { FlatList, View } from "react-native";
import ScreenContainer from "@/components/views/ScreenContainer.tsx";
import { useBookmarks } from "@/store/useBookmarks.ts";
import { Article } from "@/utils/types/app.ts";
import NewsCart from "@/components/cards/NewsCart.tsx";
import React from "react";
import InterText from "@/components/texts/InterText.tsx";
import { InterWeightEnum } from "@/utils/enums/font.ts";

const BookmarkScreen = () => {
  const bookmarks = useBookmarks((state) => state.bookmarks);

  const renderItem = ({ item, index }: { item: Article; index: number }) => (
    <NewsCart article={item} index={index + 1} />
  );

  const renderEmptyComponent = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <InterText
          weight={InterWeightEnum.Medium}
          style={{ fontSize: 16, textAlign: "center" }}
        >
          No Bookmark Available!
        </InterText>
      </View>
    );
  };

  return (
    <ScreenContainer>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          flexGrow: 1,
        }}
        data={bookmarks}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />
    </ScreenContainer>
  );
};

export default BookmarkScreen;
