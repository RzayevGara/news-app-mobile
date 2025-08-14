import { FC } from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStack, { MainStackParamList } from "@/navigation/MainStack.tsx";
import { MainStackRoutes } from "@/utils/enums/route-names.ts";
import { navigationRef } from "@/navigation/RootNavigationRef.ts";
import { useThemeColors } from "@/theme";
import { useColorScheme } from "react-native";

export type RootStackParamList = {
  [MainStackRoutes.MainStack]: NavigatorScreenParams<MainStackParamList>;
};

const Root = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => {
  const colors = useThemeColors();
  const scheme = useColorScheme();

  const navTheme = {
    ...(scheme === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(scheme === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
    },
  };

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        <Root.Screen name={MainStackRoutes.MainStack} component={MainStack} />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
