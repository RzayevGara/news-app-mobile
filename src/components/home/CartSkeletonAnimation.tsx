import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import React from "react";
import { useThemeColors } from "@/theme";
import { View } from "react-native";

const CartSkeletonAnimation = () => {
  const colors = useThemeColors();

  const base = colors.skeletonBase;
  const highlight = colors.skeletonHighlights;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SkeletonPlaceholder backgroundColor={base} highlightColor={highlight}>
        <SkeletonPlaceholder.Item>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonPlaceholder.Item
              style={{
                marginTop: i > 0 ? 25 : 12,
                flexDirection: "row",
                gap: 10,
                paddingHorizontal: 6,
              }}
              key={i}
            >
              <SkeletonPlaceholder.Item
                width={96}
                height={96}
                borderRadius={8}
              />
              <SkeletonPlaceholder.Item style={{ flex: 1 }}>
                <SkeletonPlaceholder.Item
                  width="30%"
                  height={20}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  style={{
                    marginTop: 10,
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <SkeletonPlaceholder.Item
                    width="100%"
                    height={20}
                    borderRadius={4}
                  />

                  <SkeletonPlaceholder.Item
                    style={{ flexDirection: "row", gap: 10 }}
                  >
                    <SkeletonPlaceholder.Item
                      width={50}
                      height={20}
                      borderRadius={4}
                    />

                    <SkeletonPlaceholder.Item
                      width={20}
                      height={20}
                      borderRadius={100}
                    />
                    <SkeletonPlaceholder.Item
                      width={50}
                      height={20}
                      borderRadius={4}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default CartSkeletonAnimation;
