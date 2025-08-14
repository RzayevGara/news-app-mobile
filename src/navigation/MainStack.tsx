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
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@/store/useTheme.ts";
import { Article } from "@/utils/types/app.ts";
import DetailScreen from "@/screens/DetailScreen.tsx";
import { useBookmarks } from "@/store/useBookmarks.ts";
import BookmarkScreen from "@/screens/BookmarkScreen.tsx";

export type MainStackParamList = {
  [MainStackRoutes.HomeStack]: undefined;
  [MainStackRoutes.DetailStack]: { article: Article };
  [MainStackRoutes.Bookmarks]: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  const toggleTheme = useTheme((state) => state.toggleTheme);
  const theme = useTheme((state) => state.theme);
  const bookmarks = useBookmarks((state) => state.bookmarks);

  const colors = useThemeColors();

  return (
    <Stack.Navigator
      initialRouteName={MainStackRoutes.HomeStack}
      screenOptions={{ contentStyle: { backgroundColor: colors.background } }}
    >
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
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <TouchableOpacity
                style={{ position: "relative" }}
                onPress={() => navigation.navigate(MainStackRoutes.Bookmarks)}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <BookmarkIcon color={colors.mainTextColor} />

                  {!!bookmarks.length && (
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        minWidth: 26,
                        height: 18,
                        paddingHorizontal: 6,
                        borderRadius: 12,
                        backgroundColor: colors.blue500,
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                      }}
                    >
                      <InterText style={{ fontSize: 11, color: colors.white }}>
                        {bookmarks.length > 99
                          ? "99+"
                          : String(bookmarks.length)}
                      </InterText>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleTheme}>
                {theme === "dark" ? (
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

      <Stack.Screen
        name={MainStackRoutes.DetailStack}
        component={DetailScreen}
        options={() => ({
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "Oba News",
          headerBackButtonDisplayMode: "minimal",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.mainTextColor,
          },
          headerTintColor: colors.mainTextColor,
        })}
      />

      <Stack.Screen
        name={MainStackRoutes.Bookmarks}
        component={BookmarkScreen}
        options={() => ({
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "Bookmark",
          headerBackButtonDisplayMode: "minimal",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.mainTextColor,
          },
          headerTintColor: colors.mainTextColor,
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
