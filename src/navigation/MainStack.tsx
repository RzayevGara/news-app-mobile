import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackRoutes } from "@/utils/enums/route-names.ts";
import { useThemeColors } from "@/theme";
import HomeScreen from "@/screens/HomeScreen.tsx";
import InterText from "@/components/texts/InterText.tsx";
import { InterWeightEnum } from "@/utils/enums/font.ts";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import DarkModeIcon from "@/assets/icons/dark-mode.svg";
import LightModeIcon from "@/assets/icons/light-mode.svg";
import { TouchableOpacity, View, Appearance } from "react-native";
import { useIsDark } from "@/hooks/useIsDark.ts";

export type MainStackParamList = {
  [MainStackRoutes.HomeStack]: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  const colors = useThemeColors();
  const isDark = useIsDark();

  const changeAppearanceMode = () => {
    Appearance.setColorScheme(isDark ? "light" : "dark");
  };

  return (
    <Stack.Navigator initialRouteName={MainStackRoutes.HomeStack}>
      <Stack.Screen
        name={MainStackRoutes.HomeStack}
        component={HomeScreen}
        options={({ navigation, route: { params } }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <InterText weight={InterWeightEnum.Medium} style={{ fontSize: 16 }}>
              Oba News
            </InterText>
          ),
          headerRight: () => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <BookmarkIcon color={colors.mainTextColor} />
              <TouchableOpacity onPress={changeAppearanceMode}>
                {isDark ? (
                  <DarkModeIcon width={22} height={22} />
                ) : (
                  <LightModeIcon width={22} height={22} />
                )}
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: colors.background,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
