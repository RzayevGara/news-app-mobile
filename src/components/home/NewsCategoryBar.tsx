import { FC } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useThemeColors } from "@/theme";
import { lightColors } from "@/theme/colors.ts";
import InterText from "@/components/texts/InterText.tsx";
import { InterWeightEnum } from "@/utils/enums/font.ts";
import { NewsCategory } from "@/utils/enums/app.enum.ts";

type Props = {
  activeCat: NewsCategory;
  onChange: (activeCat: NewsCategory) => void;
  isNewsLoading: boolean;
};

const NewsCategoryBar: FC<Props> = ({ activeCat, onChange, isNewsLoading }) => {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.sticky}>
      <InterText weight={InterWeightEnum.SemiBold} style={{ fontSize: 16 }}>
        Latest
      </InterText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catScrollContent}
      >
        {Object.values(NewsCategory).map((category) => {
          const selected = activeCat === category;
          return (
            <Pressable
              key={category}
              onPress={() => onChange(category)}
              disabled={isNewsLoading}
            >
              <InterText
                style={[
                  styles.chip,
                  selected && styles.chipActive,
                  styles.categoryText,
                ]}
                weight={
                  selected ? InterWeightEnum.Medium : InterWeightEnum.Regular
                }
              >
                {category}
              </InterText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default NewsCategoryBar;

function createStyles(colors: typeof lightColors) {
  return StyleSheet.create({
    sticky: { backgroundColor: colors.background, marginBottom: 16 },
    categoryText: {
      textTransform: "capitalize",
      fontSize: 16,
      paddingVertical: 10,
    },
    catScrollContent: { marginTop: 12, gap: 15, paddingHorizontal: 6 },
    chip: { color: colors.secondTextColor },
    chipActive: {
      color: colors.mainTextColor,
      borderColor: colors.blue400,
      borderBottomWidth: 2,
    },
  });
}
