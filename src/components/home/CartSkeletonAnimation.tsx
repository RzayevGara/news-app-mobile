import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import React from "react";

const CartSkeletonAnimation = () => {
  return (
    <View>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item width={100} height={20} borderRadius={4} />
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <View style={{ paddingHorizontal: 5, width: "20%" }} key={i}>
              <SkeletonPlaceholder.Item
                width="100%"
                height={20}
                borderRadius={4}
              />
            </View>
          ))}
        </View>
        <View>
          {Array.from({ length: 5 }).map((_, i) => (
            <View
              style={{ marginTop: 30, flexDirection: "row", gap: 10 }}
              key={i}
            >
              <SkeletonPlaceholder.Item
                width={96}
                height={96}
                borderRadius={8}
              />
              <View style={{ flex: 1 }}>
                <SkeletonPlaceholder.Item
                  width="30%"
                  height={20}
                  borderRadius={4}
                />
                <View
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

                  <View style={{ flexDirection: "row", gap: 10 }}>
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
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default CartSkeletonAnimation;
